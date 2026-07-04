from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import AppConfig

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'phone', 'username', 'first_name', 'last_name', 'full_name',
            'avatar', 'language', 'role', 'is_phone_verified', 'date_of_birth',
            'gender', 'balance', 'created_at',
        ]
        read_only_fields = ['id', 'phone', 'role', 'is_phone_verified', 'balance', 'created_at']


class AppConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppConfig
        fields = [
            'app_name', 'support_phone', 'support_email', 'min_supported_version',
            'force_update', 'maintenance_mode', 'about_title', 'about_description',
            'updated_at',
        ]
