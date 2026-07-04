from rest_framework import serializers

from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = (
            "id",
            "full_name",
            "email",
            "phone",
            "service",
            "product",
            "message",
            "telegram_status",
            "telegram_error",
            "amocrm_status",
            "amocrm_error",
            "created_at",
        )
        read_only_fields = ("id", "created_at")
