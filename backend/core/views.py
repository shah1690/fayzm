from django.http import JsonResponse
from django.utils.translation import gettext as _
from rest_framework import generics, permissions

from .models import AppConfig
from .serializers import AppConfigSerializer, UserSerializer


def health_check(request):
    return JsonResponse({'status': _('ok')})


class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class AppConfigView(generics.RetrieveAPIView):
    serializer_class = AppConfigSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        return AppConfig.get_solo()
