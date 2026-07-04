"""Unfold admin for all CMS content."""

from django.conf import settings
from django.contrib import admin
from django.core.files.storage import default_storage
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from unfold.admin import ModelAdmin

from .forms import (
    ABOUT_SCHEMA,
    LOCALES,
    AboutPageForm,
    DocumentForm,
    PartnerForm,
    field_name,
)
from .models import (
    AboutPage,
    Business,
    Document,
    FaqItem,
    FaqSettings,
    PageMeta,
    Partner,
    Product,
    Stat,
)

# Solar (Linear) icons — inline so the admin stays self-contained.
_EDIT_ICON = mark_safe(
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" '
    'style="vertical-align:middle">'
    '<path d="M13.087 4.32L5.65 11.756c-.53.53-.795.795-.966 1.12-.171.325-.229.7'
    '-.344 1.448l-.427 2.77c-.077.5-.115.75.026.892.141.141.392.103.892.026l2.77'
    '-.427c.749-.115 1.123-.173 1.448-.344.325-.17.59-.436 1.12-.966l7.436-7.435c'
    '.913-.914 1.37-1.37 1.37-1.938 0-.567-.457-1.024-1.37-1.937s-1.37-1.37-1.937'
    '-1.37c-.568 0-1.024.456-1.938 1.37z" stroke="currentColor" stroke-width="1.6"/>'
    '<path d="M12.25 5.5s.076 1.294 1.216 2.434S15.9 9.15 15.9 9.15" '
    'stroke="currentColor" stroke-width="1.6"/></svg>'
)
_DELETE_ICON = mark_safe(
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" '
    'style="vertical-align:middle">'
    '<path d="M20.5 6h-17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
    '<path d="M18.833 8.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79-.865.81-2.196.81'
    '-4.857.81h-.772c-2.66 0-3.991 0-4.856-.81-.865-.809-.954-2.136-1.13-4.79l-.46'
    '-6.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
    '<path d="M9.5 11l.5 5M14.5 11l-.5 5" stroke="currentColor" stroke-width="1.6" '
    'stroke-linecap="round"/>'
    '<path d="M6.5 6h.11c.884-.03 1.662-.611 1.978-1.438l.146-.383c.15-.4.226-.601'
    '.362-.752a1.5 1.5 0 011.02-.474C10.276 3 10.49 3 10.921 3h2.16c.43 0 .646 0 .845'
    '.06a1.5 1.5 0 011.02.474c.136.15.211.351.362.752l.146.383A2.25 2.25 0 0017.39 6h'
    '.11" stroke="currentColor" stroke-width="1.6"/></svg>'
)


def _en(value) -> str:
    """Preview the English string of a localized JSON field."""
    if isinstance(value, dict):
        return value.get("en", "")
    return str(value or "")


def _frontend_img(path, alt, *, height=36, max_width=130, contain=True):
    """Render an <img> for a frontend public asset (logo/product image)."""
    if not path:
        return "—"
    src = path if path.startswith("http") else f"{settings.FRONTEND_URL}/{path.lstrip('/')}"
    fit = "contain" if contain else "cover"
    return format_html(
        '<img src="{}" alt="{}" loading="lazy" '
        'style="height:{}px;max-width:{}px;object-fit:{};'
        'background:#fff;border-radius:6px;padding:3px 6px" />',
        src,
        alt,
        height,
        max_width,
        fit,
    )


class RowActionsMixin:
    """Adds per-row edit + delete icon links to the changelist, plus compact
    styling for the inline-editable `order` inputs."""

    class Media:
        css = {"all": ("admin/css/cms_admin.css",)}

    @admin.display(description=_("Amallar"))
    def row_actions(self, obj):
        meta = obj._meta
        edit_url = reverse(
            f"admin:{meta.app_label}_{meta.model_name}_change", args=[obj.pk]
        )
        delete_url = reverse(
            f"admin:{meta.app_label}_{meta.model_name}_delete", args=[obj.pk]
        )
        return format_html(
            '<div style="display:flex;align-items:center;gap:10px">'
            '<a href="{}" title="{}" style="color:#003566;display:inline-flex">{}</a>'
            '<a href="{}" title="{}" style="color:#dc2626;display:inline-flex">{}</a>'
            "</div>",
            edit_url,
            _("Tahrirlash"),
            _EDIT_ICON,
            delete_url,
            _("O'chirish"),
            _DELETE_ICON,
        )


class SingletonAdmin(ModelAdmin):
    """Hide add/delete for single-row config models."""

    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Business)
class BusinessAdmin(RowActionsMixin, ModelAdmin):
    list_display = ("slug", "label_en", "order", "row_actions")
    list_editable = ("order",)
    search_fields = ("slug",)
    ordering = ("order", "slug")

    @admin.display(description="Label (en)")
    def label_en(self, obj):
        return _en(obj.label)


@admin.register(Product)
class ProductAdmin(RowActionsMixin, ModelAdmin):
    list_display = ("image_preview", "name", "gender", "slug", "order", "row_actions")
    list_editable = ("order",)
    list_filter = ("gender",)
    search_fields = ("name", "slug", "product_id")
    ordering = ("gender", "order")

    @admin.display(description=_("Rasm"))
    def image_preview(self, obj):
        return _frontend_img(obj.image, obj.name, height=48, max_width=48, contain=False)


@admin.register(Document)
class DocumentAdmin(RowActionsMixin, ModelAdmin):
    form = DocumentForm
    list_display = (
        "slug", "object_name", "download_file_name", "size_mb", "order", "row_actions"
    )
    list_editable = ("order",)
    search_fields = ("slug", "object_name")
    readonly_fields = ("current_file",)
    fields = (
        "slug", "object_name", "download_file_name", "order",
        "current_file", "upload",
    )

    @admin.display(description=_("Hajmi"))
    def size_mb(self, obj):
        try:
            size = default_storage.size(obj.object_name)
        except Exception:
            return "—"
        return f"{size / 1048576:.2f} MB"

    @admin.display(description=_("Joriy fayl"))
    def current_file(self, obj):
        if not obj or not obj.pk or not obj.object_name:
            return "—"
        try:
            size = default_storage.size(obj.object_name)
            url = default_storage.url(obj.object_name)
        except Exception:
            return _("Fayl hali yuklanmagan")
        return format_html(
            '<a href="{}" target="_blank" rel="noopener">{}</a> · {:.2f} MB',
            url,
            obj.object_name,
            size / 1048576,
        )


@admin.register(Partner)
class PartnerAdmin(RowActionsMixin, ModelAdmin):
    form = PartnerForm
    list_display = ("logo_preview", "name", "logo", "order", "row_actions")
    list_editable = ("order",)
    search_fields = ("name",)
    readonly_fields = ("logo_preview",)
    fields = ("name", "logo", "order", "logo_preview", "upload")

    @admin.display(description=_("Logo"))
    def logo_preview(self, obj):
        return _frontend_img(obj.logo, obj.name)


@admin.register(Stat)
class StatAdmin(RowActionsMixin, ModelAdmin):
    list_display = ("label_en", "target", "unit", "show_plus", "icon", "order", "row_actions")
    list_editable = ("order",)
    ordering = ("order",)

    @admin.display(description="Label (en)")
    def label_en(self, obj):
        return _en(obj.label)


@admin.register(FaqItem)
class FaqItemAdmin(RowActionsMixin, ModelAdmin):
    list_display = ("question_en", "order", "row_actions")
    list_editable = ("order",)
    ordering = ("order",)

    @admin.display(description="Question (en)")
    def question_en(self, obj):
        return _en(obj.question)


@admin.register(PageMeta)
class PageMetaAdmin(RowActionsMixin, ModelAdmin):
    list_display = ("page", "heading_en", "row_actions")
    search_fields = ("page",)

    @admin.display(description="Heading (en)")
    def heading_en(self, obj):
        return _en(obj.heading)


@admin.register(FaqSettings)
class FaqSettingsAdmin(SingletonAdmin):
    pass


def _about_fields(predicate):
    names = []
    for path, kind, _label in ABOUT_SCHEMA:
        if not predicate(path):
            continue
        if kind == "text":
            names.append(field_name(path))
        else:
            names.extend(field_name(path, loc) for loc in LOCALES)
    return tuple(names)


@admin.register(AboutPage)
class AboutPageAdmin(SingletonAdmin):
    form = AboutPageForm

    fieldsets = (
        (_("1-bo'lim — Kompaniya tarixi"), {
            "fields": _about_fields(
                lambda p: p[0] == "section1" and "pillars" not in p
            ),
        }),
        (_("1-bo'lim — Ustunlar"), {
            "fields": _about_fields(
                lambda p: p[0] == "section1" and "pillars" in p
            ),
        }),
        (_("2-bo'lim — Yashil energiya"), {
            "fields": _about_fields(
                lambda p: p[0] == "section2" and "card" not in p
            ),
        }),
        (_("2-bo'lim — Karta"), {
            "fields": _about_fields(
                lambda p: p[0] == "section2" and "card" in p
            ),
        }),
    )
