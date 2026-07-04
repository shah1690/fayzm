from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Lead, TelegramSettings
from .serializers import LeadSerializer


class LeadCreateView(generics.CreateAPIView):
    """Persist a contact-form lead (with its Telegram/amoCRM delivery status)."""

    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [AllowAny]


class TelegramChatView(APIView):
    """Store / read the auto-detected Telegram group chat id so it persists
    across frontend restarts and redeploys."""

    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"chatId": TelegramSettings.load().chat_id or None})

    def post(self, request):
        chat_id = str(request.data.get("chatId", "")).strip()
        if chat_id:
            settings_obj = TelegramSettings.load()
            settings_obj.chat_id = chat_id
            settings_obj.save()
        return Response({"chatId": TelegramSettings.load().chat_id or None})
