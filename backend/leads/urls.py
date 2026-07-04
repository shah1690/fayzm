from django.urls import path

from . import views

app_name = "leads"

urlpatterns = [
    path("leads/", views.LeadCreateView.as_view(), name="lead-create"),
    path("telegram/chat/", views.TelegramChatView.as_view(), name="telegram-chat"),
]
