from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from unfold.admin import ModelAdmin

from .models import DeliveryStatus, Lead

_STATUS_COLOR = {
    DeliveryStatus.SENT: ("#065f46", "#d1fae5"),
    DeliveryStatus.FAILED: ("#991b1b", "#fee2e2"),
    DeliveryStatus.SKIPPED: ("#374151", "#e5e7eb"),
}


def _badge(status, label):
    fg, bg = _STATUS_COLOR.get(status, ("#374151", "#e5e7eb"))
    return format_html(
        '<span style="display:inline-block;padding:2px 10px;border-radius:999px;'
        'font-size:12px;font-weight:600;color:{};background:{}">{}</span>',
        fg, bg, label,
    )


@admin.register(Lead)
class LeadAdmin(ModelAdmin):
    list_display = (
        "created_at", "full_name", "phone", "email",
        "service", "telegram_badge", "amocrm_badge",
    )
    list_filter = ("telegram_status", "amocrm_status", "created_at")
    search_fields = ("full_name", "phone", "email", "message")
    date_hierarchy = "created_at"
    readonly_fields = (
        "full_name", "email", "phone", "service", "product", "message",
        "telegram_status", "telegram_error", "amocrm_status", "amocrm_error",
        "created_at",
    )

    @admin.display(description=_("Telegram"), ordering="telegram_status")
    def telegram_badge(self, obj):
        return _badge(obj.telegram_status, obj.get_telegram_status_display())

    @admin.display(description=_("amoCRM"), ordering="amocrm_status")
    def amocrm_badge(self, obj):
        return _badge(obj.amocrm_status, obj.get_amocrm_status_display())

    def has_add_permission(self, request):
        return False
