"""Friendly, input-based admin form for the AboutPage JSON blob.

AboutPage stores the whole About page as one nested JSON document. Editing raw
JSON is not usable for non-technical staff, so this form flattens every leaf
into a labelled input (one per locale for localized text) and reassembles the
JSON on save. The stored shape — and therefore the API/frontend — is unchanged.
"""

from copy import deepcopy

from django import forms
from django.core.files.storage import default_storage
from django.utils.translation import gettext_lazy as _
from unfold.widgets import (
    UnfoldAdminFileFieldWidget,
    UnfoldAdminTextareaWidget,
    UnfoldAdminTextInputWidget,
)

from .models import AboutPage, Document


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
