"""CMS models — every piece of frontend content, editable from the admin.

Multilingual text is stored as a JSON object keyed by locale ({"en","uz","ru",
"zh"}) so the shape maps 1:1 onto the frontend's localized string types.
"""

from django.db import models
from django.utils.translation import gettext_lazy as _

LOCALES = ("en", "uz", "ru", "zh")


def empty_localized() -> dict:
    """Default for a localized text field: an empty string per locale."""
    return {locale: "" for locale in LOCALES}


def LocalizedField(**kwargs):
    """A JSON field holding {en, uz, ru, zh} strings."""
    kwargs.setdefault("default", empty_localized)
    kwargs.setdefault("blank", True)
    return models.JSONField(**kwargs)


class TimeStamped(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Business(TimeStamped):
    """A business division (matches frontend BusinessData)."""

    slug = models.SlugField(max_length=64, unique=True)
    order = models.PositiveIntegerField(default=0, db_index=True)

    label = LocalizedField()
    heading = LocalizedField()
    description = LocalizedField()
    card_heading = LocalizedField()
    card_text = LocalizedField()
    body_text = LocalizedField()
    strategy_heading = LocalizedField()
    strategy_desc = LocalizedField()
    # list of localized dicts: [{"en": "...", "uz": "..."}, ...]
    features = models.JSONField(default=list, blank=True)

    image1 = models.CharField(max_length=255, blank=True)
    image2 = models.CharField(max_length=255, blank=True)
    image3 = models.CharField(max_length=255, blank=True)
    cta_image = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ("order", "slug")
        verbose_name = _("Business")
        verbose_name_plural = _("Businesses")

    def __str__(self) -> str:
        return self.label.get("en") or self.slug


class Product(TimeStamped):
    class Gender(models.TextChoices):
        WOMEN = "women", _("Women")
        MEN = "men", _("Men")

    product_id = models.CharField(max_length=32, unique=True)
    slug = models.SlugField(max_length=64)
    gender = models.CharField(max_length=8, choices=Gender.choices)
    name = models.CharField(max_length=128)
    description = LocalizedField()
    image = models.CharField(max_length=255, blank=True)

    fabric = models.CharField(max_length=128, blank=True)
    composition = models.CharField(max_length=128, blank=True)
    weight = models.CharField(max_length=64, blank=True)

    sizes = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("gender", "order", "slug")
        constraints = [
            models.UniqueConstraint(
                fields=("gender", "slug"), name="uniq_product_gender_slug"
            )
        ]
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def __str__(self) -> str:
        return f"{self.get_gender_display()} — {self.name}"


class Document(TimeStamped):
    """A downloadable PDF stored in MinIO (matches DocumentDefinition)."""

    slug = models.SlugField(max_length=128, unique=True)
    object_name = models.CharField(
        max_length=255, help_text=_("Object key in the media bucket, e.g. 'documents/eng man.pdf'")
    )
    download_file_name = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("order", "slug")

    def __str__(self) -> str:
        return self.slug


class Partner(TimeStamped):
    name = models.CharField(max_length=128)
    logo = models.CharField(max_length=255, help_text=_("Path or URL to the logo image"))
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("order", "name")

    def __str__(self) -> str:
        return self.name


class Stat(TimeStamped):
    class Icon(models.TextChoices):
        TSHIRT = "tshirt", _("T-shirt")
        BRIEFCASE = "briefcase", _("Briefcase")
        HANDSHAKE = "handshake", _("Handshake")
        BOLT = "bolt", _("Bolt")

    target = models.PositiveIntegerField(help_text=_("Number shown with count-up animation"))
    unit = models.CharField(max_length=16, blank=True, help_text=_("e.g. 'mln', 'kW'"))
    show_plus = models.BooleanField(default=False)
    icon = models.CharField(max_length=16, choices=Icon.choices)
    label = LocalizedField()
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("order",)

    def __str__(self) -> str:
        return self.label.get("en") or f"stat-{self.pk}"


class FaqItem(TimeStamped):
    question = LocalizedField()
    answer = LocalizedField()
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("order",)
        verbose_name = _("FAQ item")

    def __str__(self) -> str:
        return self.question.get("en") or f"faq-{self.pk}"


class Singleton(TimeStamped):
    """Base for single-row config models."""

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _created = cls.objects.get_or_create(pk=1)
        return obj


class FaqSettings(Singleton):
    """Surrounding copy for the FAQ page."""

    title = LocalizedField()
    subtitle = LocalizedField()
    still_have_questions = LocalizedField()
    still_have_desc = LocalizedField()
    schedule_call = LocalizedField()

    class Meta:
        verbose_name = _("FAQ settings")
        verbose_name_plural = _("FAQ settings")

    def __str__(self) -> str:
        return "FAQ settings"


class PageMeta(TimeStamped):
    """Localized SEO metadata for a page (matches pageMetadata entries)."""

    page = models.SlugField(max_length=64, unique=True, help_text=_("Page key, e.g. 'about'"))
    heading = LocalizedField()
    title = LocalizedField()
    description = LocalizedField()

    class Meta:
        ordering = ("page",)
        verbose_name = _("Page metadata")
        verbose_name_plural = _("Page metadata")

    def __str__(self) -> str:
        return self.page


class AboutPage(Singleton):
    """The About page content. Stored as structured JSON to preserve the
    frontend's nested sections/pillars exactly."""

    content = models.JSONField(default=dict, blank=True)

    class Meta:
        verbose_name = _("About page")
        verbose_name_plural = _("About page")

    def __str__(self) -> str:
        return "About page"
