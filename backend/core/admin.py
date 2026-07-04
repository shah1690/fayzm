from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from unfold.admin import ModelAdmin

from .models import AppConfig, User


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    list_display = ['phone', 'full_name_display', 'role', 'language', 'is_phone_verified', 'is_staff', 'is_active', 'created_at']
    list_filter = ['role', 'language', 'is_phone_verified', 'is_staff', 'is_active']
    search_fields = ['phone', 'username', 'first_name', 'last_name', 'email']
    ordering = ['-created_at']
    date_hierarchy = 'created_at'
    fieldsets = BaseUserAdmin.fieldsets + (
        (_("Qo'shimcha ma'lumotlar"), {
            'fields': ('phone', 'avatar', 'language', 'role', 'is_phone_verified', 'date_of_birth', 'gender', 'balance'),
        }),
    )

    @admin.display(description=_("To'liq ism"))
    def full_name_display(self, obj):
        return obj.full_name


@admin.register(AppConfig)
class AppConfigAdmin(ModelAdmin):
    fieldsets = [
        (_('Ilova'), {'fields': ['app_name', 'min_supported_version', 'force_update', 'maintenance_mode']}),
        (_('Yordam'), {'fields': ['support_phone', 'support_email']}),
        (_('Haqida'), {'fields': ['about_title', 'about_description']}),
        (_('Oxirgi yangilash'), {'fields': ['updated_at']}),
    ]
    readonly_fields = ['updated_at']

    def has_add_permission(self, request):
        return not AppConfig.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
