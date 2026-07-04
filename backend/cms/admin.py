"""Unfold admin for all CMS content."""

from django.contrib import admin
from unfold.admin import ModelAdmin

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


def _en(value) -> str:
    """Preview the English string of a localized JSON field."""
    if isinstance(value, dict):
        return value.get("en", "")
    return str(value or "")


class SingletonAdmin(ModelAdmin):
    """Hide add/delete for single-row config models."""

    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Business)
class BusinessAdmin(ModelAdmin):
    list_display = ("slug", "label_en", "order")
    list_editable = ("order",)
    search_fields = ("slug",)
    ordering = ("order", "slug")

    @admin.display(description="Label (en)")
    def label_en(self, obj):
        return _en(obj.label)


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ("name", "gender", "slug", "order")
    list_editable = ("order",)
    list_filter = ("gender",)
    search_fields = ("name", "slug", "product_id")
    ordering = ("gender", "order")


@admin.register(Document)
class DocumentAdmin(ModelAdmin):
    list_display = ("slug", "object_name", "download_file_name", "order")
    list_editable = ("order",)
    search_fields = ("slug", "object_name")


@admin.register(Partner)
class PartnerAdmin(ModelAdmin):
    list_display = ("name", "logo", "order")
    list_editable = ("order",)
    search_fields = ("name",)


@admin.register(Stat)
class StatAdmin(ModelAdmin):
    list_display = ("label_en", "target", "unit", "show_plus", "icon", "order")
    list_editable = ("order",)
    ordering = ("order",)

    @admin.display(description="Label (en)")
    def label_en(self, obj):
        return _en(obj.label)


@admin.register(FaqItem)
class FaqItemAdmin(ModelAdmin):
    list_display = ("question_en", "order")
    list_editable = ("order",)
    ordering = ("order",)

    @admin.display(description="Question (en)")
    def question_en(self, obj):
        return _en(obj.question)


@admin.register(PageMeta)
class PageMetaAdmin(ModelAdmin):
    list_display = ("page", "heading_en")
    search_fields = ("page",)

    @admin.display(description="Heading (en)")
    def heading_en(self, obj):
        return _en(obj.heading)


@admin.register(FaqSettings)
class FaqSettingsAdmin(SingletonAdmin):
    pass


@admin.register(AboutPage)
class AboutPageAdmin(SingletonAdmin):
    pass
