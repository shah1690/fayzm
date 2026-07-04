from django.urls import path

from .views import AppConfigView, MeView

urlpatterns = [
    path('auth/me/', MeView.as_view(), name='me'),
    path('config/', AppConfigView.as_view(), name='app-config'),
]
