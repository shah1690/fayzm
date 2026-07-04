"""Core models: phone-first user (admin auth) and singleton app config."""

import uuid
from decimal import Decimal

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Phone-first user model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    LANGUAGE_CHOICES = [
        ('uz', _("O'zbek")),
        ('en', _('English')),
        ('ru', _('Rus')),
    ]
    GENDER_CHOICES = [
        ('male', _('Erkak')),
        ('female', _('Ayol')),
    ]
    ROLE_CHOICES = [
        ('user', _('Foydalanuvchi')),
        ('staff', _('Xodim')),
        ('admin', _('Admin')),
    ]

    phone = models.CharField(max_length=20, unique=True, verbose_name=_('Telefon'))
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, verbose_name=_('Avatar'))
    language = models.CharField(max_length=5, choices=LANGUAGE_CHOICES, default='uz', verbose_name=_('Til'))
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user', verbose_name=_('Rol'))
    is_phone_verified = models.BooleanField(default=False, verbose_name=_('Telefon tasdiqlangan'))
    date_of_birth = models.DateField(null=True, blank=True, verbose_name=_("Tug'ilgan sana"))
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, verbose_name=_('Jinsi'))
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0'), verbose_name=_('Balans'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Yaratilgan vaqt'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('Yangilangan vaqt'))

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'users'
        verbose_name = _('Foydalanuvchi')
        verbose_name_plural = _('Foydalanuvchilar')

    def __str__(self):
        return self.phone or self.username

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'.strip() or self.phone or self.username


class AppConfig(models.Model):
    """Singleton app settings editable from Unfold admin."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    app_name = models.CharField(max_length=100, default='FAYZ-M', verbose_name=_('Ilova nomi'))
    support_phone = models.CharField(max_length=30, blank=True, verbose_name=_('Yordam telefoni'))
    support_email = models.EmailField(blank=True, verbose_name=_('Yordam emaili'))
    min_supported_version = models.CharField(max_length=20, blank=True, verbose_name=_('Minimal versiya'))
    force_update = models.BooleanField(default=False, verbose_name=_('Majburiy yangilash'))
    maintenance_mode = models.BooleanField(default=False, verbose_name=_('Texnik tanaffus'))
    about_title = models.CharField(max_length=200, default='FAYZ-M', verbose_name=_('Haqida sarlavha'))
    about_description = models.TextField(blank=True, verbose_name=_('Haqida matni'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('Yangilangan vaqt'))

    class Meta:
        db_table = 'app_config'
        verbose_name = _('App Config')
        verbose_name_plural = _('App Config')

    def __str__(self):
        return self.app_name

    def save(self, *args, **kwargs):
        if self._state.adding and AppConfig.objects.exists():
            self.pk = AppConfig.objects.values_list('pk', flat=True).first()
            self._state.adding = False
        super().save(*args, **kwargs)

    @classmethod
    def get_solo(cls):
        obj = cls.objects.first()
        return obj or cls.objects.create()
