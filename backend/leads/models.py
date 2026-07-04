"""Contact-form leads captured from the website, with per-channel delivery
status (Telegram + amoCRM)."""

from django.db import models
from django.utils.translation import gettext_lazy as _


class DeliveryStatus(models.TextChoices):
    SENT = "sent", _("Yuborilgan")
    FAILED = "failed", _("Xato")
    SKIPPED = "skipped", _("O'tkazib yuborilgan")


class Lead(models.Model):
    full_name = models.CharField(_("F.I.O"), max_length=160)
    email = models.EmailField(_("Email"), blank=True)
    phone = models.CharField(_("Telefon"), max_length=32, blank=True)
    service = models.CharField(_("Xizmat"), max_length=160, blank=True)
    product = models.CharField(_("Mahsulot"), max_length=160, blank=True)
    message = models.TextField(_("Xabar"), blank=True)

    telegram_status = models.CharField(
        _("Telegram"), max_length=16, choices=DeliveryStatus.choices,
        default=DeliveryStatus.SKIPPED,
    )
    telegram_error = models.TextField(_("Telegram xatosi"), blank=True)

    amocrm_status = models.CharField(
        _("amoCRM"), max_length=16, choices=DeliveryStatus.choices,
        default=DeliveryStatus.SKIPPED,
    )
    amocrm_error = models.TextField(_("amoCRM xatosi"), blank=True)

    created_at = models.DateTimeField(_("Sana"), auto_now_add=True, db_index=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = _("Zayavka")
        verbose_name_plural = _("Zayavkalar")

    def __str__(self) -> str:
        return f"{self.full_name} · {self.phone or self.email}"


class TelegramSettings(models.Model):
    """Durably remembers the Telegram group chat id auto-detected by the
    frontend, so it survives redeploys (no TELEGRAM_CHAT_ID env needed)."""

    id = models.PositiveSmallIntegerField(primary_key=True, default=1)
    chat_id = models.CharField(_("Chat ID"), max_length=64, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Telegram sozlamasi")
        verbose_name_plural = _("Telegram sozlamasi")

    def save(self, *args, **kwargs):
        self.id = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _created = cls.objects.get_or_create(id=1)
        return obj

    def __str__(self) -> str:
        return self.chat_id or "—"
