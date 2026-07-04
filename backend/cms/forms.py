"""Friendly, input-based admin form for the AboutPage JSON blob.

AboutPage stores the whole About page as one nested JSON document. Editing raw
JSON is not usable for non-technical staff, so this form flattens every leaf
into a labelled input (one per locale for localized text) and reassembles the
JSON on save. The stored shape — and therefore the API/frontend — is unchanged.
"""

import os
from copy import deepcopy

from django import forms
from django.conf import settings
from django.core.files.storage import default_storage
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from unfold.widgets import (
    UnfoldAdminFileFieldWidget,
    UnfoldAdminTextareaWidget,
    UnfoldAdminTextInputWidget,
)

from .models import (
    AboutPage,
    Business,
    Document,
    FaqItem,
    FaqSettings,
    HomeCollections,
    HomeContact,
    HomeCta,
    HomeCtaBanner,
    HomeHero,
    HomeIntro,
    HomeWorldMap,
    PageMeta,
    Partner,
    Product,
    Stat,
)




def _storage_key_from_url(url):
    """Extract the object key from a MinIO public URL, else None."""
    bucket = getattr(settings, "MINIO_BUCKET_NAME", None)
    marker = f"/{bucket}/" if bucket else None
    if url and marker and marker in url:
        return url.split(marker, 1)[1]
    return None


class PartnerForm(forms.ModelForm):
    """Partner form with a logo upload that writes to MinIO and replaces the
    previous logo."""

    upload = forms.ImageField(
        required=False,
        label=_("Logo yuklash"),
        help_text=_("Yangi rasm yuklansa, eski logo almashtiriladi."),
        widget=UnfoldAdminFileFieldWidget,
    )

    class Meta:
        model = Partner
        fields = "__all__"

    def save(self, commit=True):
        instance = super().save(commit=False)
        upload = self.cleaned_data.get("upload")
        if upload:
            ext = (os.path.splitext(upload.name)[1] or ".png").lower()
            base = slugify(instance.name) or "partner"
            key = f"partners/{base}{ext}"
            # Drop the previous MinIO object (if the old logo was one).
            old_key = _storage_key_from_url(instance.logo)
            if old_key and old_key != key and default_storage.exists(old_key):
                default_storage.delete(old_key)
            if default_storage.exists(key):
                default_storage.delete(key)
            default_storage.save(key, upload)
            instance.logo = default_storage.url(key)
        if commit:
            instance.save()
            self.save_m2m()
        return instance


class DocumentForm(forms.ModelForm):
    """Document form with a file upload that writes to MinIO at object_name,
    replacing any existing file."""

    upload = forms.FileField(
        required=False,
        label=_("Fayl yuklash"),
        help_text=_("Yangi fayl yuklansa, eskisi almashtiriladi."),
        widget=UnfoldAdminFileFieldWidget,
    )

    class Meta:
        model = Document
        fields = "__all__"

    def save(self, commit=True):
        instance = super().save(commit=False)
        upload = self.cleaned_data.get("upload")
        if upload:
            name = instance.object_name
            if default_storage.exists(name):
                default_storage.delete(name)
            default_storage.save(name, upload)
        if commit:
            instance.save()
            self.save_m2m()
        return instance

LOCALES = ("en", "uz", "ru", "zh")
LOCALE_LABEL = {"en": "🇬🇧 EN", "uz": "🇺🇿 UZ", "ru": "🇷🇺 RU", "zh": "🇨🇳 ZH"}

# kind: 'text' (plain string), 'loc' (short localized), 'longloc' (long localized)
# Each entry: (path tuple, kind, label)
ABOUT_SCHEMA = [
    (("section1", "heading"), "loc", _("1-bo'lim — Sarlavha")),
    (("section1", "description"), "longloc", _("1-bo'lim — Tavsif")),
    (("section1", "cta"), "loc", _("1-bo'lim — Tugma matni")),
    (("section1", "image"), "text", _("1-bo'lim — Rasm (path)")),
    (("section1", "pillars", 0, "title"), "loc", _("1-ustun — Sarlavha")),
    (("section1", "pillars", 0, "text"), "longloc", _("1-ustun — Matn")),
    (("section1", "pillars", 1, "title"), "loc", _("2-ustun — Sarlavha")),
    (("section1", "pillars", 1, "text"), "longloc", _("2-ustun — Matn")),
    (("section1", "pillars", 2, "title"), "loc", _("3-ustun — Sarlavha")),
    (("section1", "pillars", 2, "text"), "longloc", _("3-ustun — Matn")),
    (("section2", "heading"), "loc", _("2-bo'lim — Sarlavha")),
    (("section2", "description"), "longloc", _("2-bo'lim — Tavsif")),
    (("section2", "image"), "text", _("2-bo'lim — Rasm (path)")),
    (("section2", "card", "icon"), "text", _("Karta — Ikonka (emoji)")),
    (("section2", "card", "title"), "loc", _("Karta — Sarlavha")),
    (("section2", "card", "text"), "longloc", _("Karta — Matn")),
    (("section2", "card", "cta"), "loc", _("Karta — Tugma matni")),
]


def field_name(path, locale=None):
    base = "f_" + "__".join(str(p) for p in path)
    return f"{base}__{locale}" if locale else base


def _get(content, path):
    cur = content
    for key in path:
        if isinstance(key, int):
            if isinstance(cur, list) and key < len(cur):
                cur = cur[key]
            else:
                return None
        elif isinstance(cur, dict):
            cur = cur.get(key)
        else:
            return None
        if cur is None:
            return None
    return cur


def _set(content, path, value):
    cur = content
    for i, key in enumerate(path[:-1]):
        nxt = path[i + 1]
        if isinstance(key, int):
            while len(cur) <= key:
                cur.append([] if isinstance(nxt, int) else {})
            cur = cur[key]
        else:
            if not isinstance(cur.get(key), (dict, list)):
                cur[key] = [] if isinstance(nxt, int) else {}
            cur = cur[key]
    last = path[-1]
    if isinstance(last, int):
        while len(cur) <= last:
            cur.append(None)
        cur[last] = value
    else:
        cur[last] = value


def _build_declared_fields():
    """Every About leaf as a form field. The schema is static, so declare these
    at class level (admin's modelform_factory needs to know them by name)."""
    fields = {}
    for path, kind, label in ABOUT_SCHEMA:
        if kind == "text":
            fields[field_name(path)] = forms.CharField(
                label=label, required=False, widget=UnfoldAdminTextInputWidget()
            )
        else:
            for loc in LOCALES:
                widget = (
                    UnfoldAdminTextareaWidget(attrs={"rows": 3})
                    if kind == "longloc"
                    else UnfoldAdminTextInputWidget()
                )
                fields[field_name(path, loc)] = forms.CharField(
                    label=f"{label} · {LOCALE_LABEL[loc]}",
                    required=False,
                    widget=widget,
                )
    return fields


class AboutPageForm(forms.ModelForm):
    class Meta:
        model = AboutPage
        fields = ()  # `content` is edited through the declared fields below

    # Declare all leaf fields at class level so the admin can reference them.
    locals().update(_build_declared_fields())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        content = self.instance.content or {}
        for path, kind, _label in ABOUT_SCHEMA:
            value = _get(content, path)
            if kind == "text":
                self.initial[field_name(path)] = value or ""
            else:
                value = value if isinstance(value, dict) else {}
                for loc in LOCALES:
                    self.initial[field_name(path, loc)] = value.get(loc, "")

    def save(self, commit=True):
        content = deepcopy(self.instance.content) if self.instance.content else {}
        for path, kind, _label in ABOUT_SCHEMA:
            if kind == "text":
                _set(content, path, self.cleaned_data.get(field_name(path), ""))
            else:
                _set(
                    content,
                    path,
                    {loc: self.cleaned_data.get(field_name(path, loc), "") for loc in LOCALES},
                )
        self.instance.content = content
        return super().save(commit=commit)


def _label_for(model_cls, name):
    try:
        return str(model_cls._meta.get_field(name).verbose_name).strip()
    except Exception:
        return name.replace("_", " ")


def _upload_replace_image(instance, image_field, key_prefix, base_name, upload):
    """Save an uploaded image to MinIO, delete the previous object, and set the
    model's image field to the stored public URL."""
    ext = (os.path.splitext(upload.name)[1] or ".png").lower()
    base = slugify(base_name) or "item"
    key = f"{key_prefix}/{base}{ext}"
    old_key = _storage_key_from_url(getattr(instance, image_field, "") or "")
    if old_key and old_key != key and default_storage.exists(old_key):
        default_storage.delete(old_key)
    if default_storage.exists(key):
        default_storage.delete(key)
    default_storage.save(key, upload)
    setattr(instance, image_field, default_storage.url(key))


def make_localized_form(model_cls, *, short=(), long=(), lists=(), images=()):
    """Build a ModelForm that exposes each localized JSON field as one input
    per locale (en/uz/ru/zh) instead of a raw JSON textarea. `lists` are
    list-of-localized fields (e.g. Business.features): one textarea per locale,
    one item per line. `images` is a sequence of (model_field, key_prefix): each
    adds an upload that writes to MinIO and replaces that image. Plain model
    fields render normally.
    """
    localized = {name: "short" for name in short}
    localized.update({name: "long" for name in long})
    list_fields = tuple(lists)
    images = tuple(images)
    excluded = tuple(localized) + list_fields

    declared = {}
    for field, _key in images:
        label = _label_for(model_cls, field)
        declared[f"upload__{field}"] = forms.ImageField(
            required=False,
            label=_("%(f)s — yuklash") % {"f": label},
            help_text=_("Yangi rasm eskisini almashtiradi."),
            widget=UnfoldAdminFileFieldWidget,
        )
    for name, kind in localized.items():
        base = _label_for(model_cls, name)
        for loc in LOCALES:
            widget = (
                UnfoldAdminTextareaWidget(attrs={"rows": 2})
                if kind == "long"
                else UnfoldAdminTextInputWidget()
            )
            declared[field_name((name,), loc)] = forms.CharField(
                label=f"{base} · {LOCALE_LABEL[loc]}", required=False, widget=widget
            )
    for name in list_fields:
        base = _label_for(model_cls, name)
        for loc in LOCALES:
            declared[field_name((name,), loc)] = forms.CharField(
                label=f"{base} · {LOCALE_LABEL[loc]}",
                required=False,
                help_text=_("Har qatorda bitta element."),
                widget=UnfoldAdminTextareaWidget(attrs={"rows": 4}),
            )

    class _Meta:
        model = model_cls
        exclude = excluded

    def __init__(self, *args, **kwargs):
        forms.ModelForm.__init__(self, *args, **kwargs)
        inst = self.instance
        for name in localized:
            val = getattr(inst, name, None)
            val = val if isinstance(val, dict) else {}
            for loc in LOCALES:
                self.initial[field_name((name,), loc)] = val.get(loc, "")
        for name in list_fields:
            items = getattr(inst, name, None) or []
            for loc in LOCALES:
                self.initial[field_name((name,), loc)] = "\n".join(
                    str((it or {}).get(loc, "")) for it in items if isinstance(it, dict)
                )

    def save(self, commit=True):
        inst = forms.ModelForm.save(self, commit=False)
        for name in localized:
            setattr(
                inst,
                name,
                {loc: self.cleaned_data.get(field_name((name,), loc), "") for loc in LOCALES},
            )
        for name in list_fields:
            per = {
                loc: self.cleaned_data.get(field_name((name,), loc), "").split("\n")
                for loc in LOCALES
            }
            count = max((len(v) for v in per.values()), default=0)
            rows = []
            for i in range(count):
                row = {
                    loc: (per[loc][i].strip() if i < len(per[loc]) else "")
                    for loc in LOCALES
                }
                if any(row.values()):
                    rows.append(row)
            setattr(inst, name, rows)
        rid = (
            getattr(inst, "product_id", None)
            or getattr(inst, "slug", None)
            or getattr(inst, "name", None)
            or "item"
        )
        for field, key in images:
            upload = self.cleaned_data.get(f"upload__{field}")
            if upload:
                _upload_replace_image(inst, field, key, f"{rid}-{field}", upload)
        if commit:
            inst.save()
            self.save_m2m()
        return inst

    attrs = {"Meta": _Meta, "__init__": __init__, "save": save, **declared}
    return type(f"{model_cls.__name__}LocalizedForm", (forms.ModelForm,), attrs)


BusinessForm = make_localized_form(
    Business,
    short=("label", "card_heading", "strategy_heading"),
    long=("heading", "description", "card_text", "body_text", "strategy_desc"),
    lists=("features",),
    images=(
        ("image1", "businesses"),
        ("image2", "businesses"),
        ("image3", "businesses"),
        ("cta_image", "businesses"),
    ),
)
ProductForm = make_localized_form(
    Product, long=("description",), images=(("image", "products"),)
)
StatForm = make_localized_form(Stat, short=("label",))
FaqItemForm = make_localized_form(FaqItem, short=("question",), long=("answer",))
FaqSettingsForm = make_localized_form(
    FaqSettings,
    short=("still_have_questions", "schedule_call"),
    long=("title", "subtitle", "still_have_desc"),
)
PageMetaForm = make_localized_form(
    PageMeta, short=("heading", "title"), long=("description",)
)

HomeHeroForm = make_localized_form(
    HomeHero, short=("scroll_label",), long=("title", "subtitle")
)
HomeIntroForm = make_localized_form(
    HomeIntro, short=("eyebrow", "cta"), long=("heading", "description")
)
HomeCollectionsForm = make_localized_form(
    HomeCollections,
    short=("eyebrow", "women_label", "men_label"),
    long=("heading", "subtitle"),
)
HomeCtaForm = make_localized_form(HomeCta, short=("cta",), long=("heading", "description"))
HomeCtaBannerForm = make_localized_form(
    HomeCtaBanner, short=("label", "cta"), long=("heading", "description")
)
HomeWorldMapForm = make_localized_form(HomeWorldMap, long=("heading", "subtitle"))
HomeContactForm = make_localized_form(
    HomeContact,
    short=("label", "call_us"),
    long=("heading", "description", "prefer_talk", "instant_support"),
)
