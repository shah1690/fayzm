"""Unfold admin dashboard callback — FAYZ-M website overview.

Surfaces the metrics that matter for this marketing site: contact-form leads
(volume + Telegram/amoCRM delivery), CMS content counts, and a few interesting
breakdowns. Brand navy is used for charts.
"""

import json
from datetime import timedelta

from django.db.models import Count
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from cms.models import Business, Document, FaqItem, Partner, Product, Stat
from leads.models import DeliveryStatus, Lead

NAVY = "#003566"


def _last_days(today, n):
    return [today - timedelta(days=i) for i in range(n - 1, -1, -1)]


def dashboard_callback(request, context):
    now = timezone.now()
    today = now.date()
    week_ago = now - timedelta(days=7)

    leads = Lead.objects.all()
    leads_total = leads.count()
    leads_today = leads.filter(created_at__date=today).count()
    leads_week = leads.filter(created_at__gte=week_ago).count()

    tg_sent = leads.filter(telegram_status=DeliveryStatus.SENT).count()
    tg_failed = leads.filter(telegram_status=DeliveryStatus.FAILED).count()
    amo_sent = leads.filter(amocrm_status=DeliveryStatus.SENT).count()
    amo_failed = leads.filter(amocrm_status=DeliveryStatus.FAILED).count()

    kpis = [
        {
            "title": _("Jami zayavkalar"),
            "value": f"{leads_total:,}".replace(",", " "),
            "footer": _("+%(n)d oxirgi 7 kunda") % {"n": leads_week},
            "icon": "inbox",
        },
        {
            "title": _("Bugungi zayavkalar"),
            "value": f"{leads_today:,}".replace(",", " "),
            "footer": _("Bugun kelgan so'rovlar"),
            "icon": "today",
        },
        {
            "title": _("Mahsulotlar"),
            "value": Product.objects.count(),
            "footer": _("Kolleksiyalardagi mahsulotlar"),
            "icon": "checkroom",
        },
        {
            "title": _("Biznes yo'nalishlari"),
            "value": Business.objects.count(),
            "footer": _("Faoliyat yo'nalishlari"),
            "icon": "factory",
        },
        {
            "title": _("Hamkorlar"),
            "value": Partner.objects.count(),
            "footer": _("Ishonchli hamkorlar"),
            "icon": "handshake",
        },
        {
            "title": _("Hujjatlar"),
            "value": Document.objects.count(),
            "footer": _("Yuklab olinadigan kataloglar"),
            "icon": "picture_as_pdf",
        },
    ]

    # 14-day leads chart
    days = _last_days(today, 14)
    per_day = dict(
        leads.filter(created_at__date__gte=days[0])
        .values_list("created_at__date")
        .annotate(n=Count("id"))
    )
    leads_chart = json.dumps({
        "labels": [d.strftime("%d.%m") for d in days],
        "datasets": [{
            "label": str(_("Zayavkalar")),
            "data": [per_day.get(d, 0) for d in days],
            "backgroundColor": NAVY,
            "borderColor": NAVY,
            "borderRadius": 6,
        }],
    })

    def _pct(part, total):
        return round(part / total * 100) if total else 0

    delivery = [
        {
            "label": "Telegram", "sent": tg_sent, "failed": tg_failed,
            "total": tg_sent + tg_failed, "pct": _pct(tg_sent, tg_sent + tg_failed),
        },
        {
            "label": "amoCRM", "sent": amo_sent, "failed": amo_failed,
            "total": amo_sent + amo_failed, "pct": _pct(amo_sent, amo_sent + amo_failed),
        },
    ]

    men = Product.objects.filter(gender=Product.Gender.MEN).count()
    women = Product.objects.filter(gender=Product.Gender.WOMEN).count()
    products_split = {
        "men": men, "women": women,
        "men_pct": _pct(men, men + women), "women_pct": _pct(women, men + women),
    }

    top_services = list(
        leads.exclude(service="")
        .values("service")
        .annotate(n=Count("id"))
        .order_by("-n")[:5]
    )

    content_counts = [
        {"label": _("Biznes"), "value": Business.objects.count(), "icon": "factory"},
        {"label": _("Mahsulot"), "value": Product.objects.count(), "icon": "checkroom"},
        {"label": _("Hamkor"), "value": Partner.objects.count(), "icon": "handshake"},
        {"label": _("FAQ"), "value": FaqItem.objects.count(), "icon": "quiz"},
        {"label": _("Statistika"), "value": Stat.objects.count(), "icon": "insights"},
        {"label": _("Hujjat"), "value": Document.objects.count(), "icon": "picture_as_pdf"},
    ]

    context.update({
        "kpis": kpis,
        "leads_chart": leads_chart,
        "delivery": delivery,
        "products_split": products_split,
        "top_services": top_services,
        "content_counts": content_counts,
        "recent_leads": list(leads[:6]),
        "has_leads": leads_total > 0,
    })
    return context
