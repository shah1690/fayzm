from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Lead
from .serializers import LeadSerializer


class LeadCreateView(generics.CreateAPIView):
    """Persist a contact-form lead (with its Telegram/amoCRM delivery status)."""

    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [AllowAny]
