"""Seed the CMS from the exported frontend content JSON.

Run the frontend exporter first (writes cms/seed_data/*.json):
    node frontend/scripts/export-content.mjs

Then:
    python manage.py seed_cms          # upsert, keep existing
    python manage.py seed_cms --flush  # wipe CMS tables first
"""

import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from cms.models import (
    AboutPage,
    Business,
    Document,
    FaqItem,
    FaqSettings,
    PageMeta,
    Partner,
    Product,
    Stat,
)

LOCALES = ("en", "uz", "ru", "zh")
DATA_DIR = Path(__file__).resolve().parents[2] / "seed_data"


def load(name: str):
    path = DATA_DIR / f"{name}.json"
    if not path.exists():
        raise FileNotFoundError(
            f"{path} not found — run `node frontend/scripts/export-content.mjs` first."
        )
    return json.loads(path.read_text(encoding="utf-8"))


class Command(BaseCommand):
    help = "Seed CMS content from exported frontend JSON."

    def add_arguments(self, parser):
        parser.add_argument("--flush", action="store_true", help="Delete existing CMS rows first")

    @transaction.atomic
    def handle(self, *args, **options):
        if options["flush"]:
            for model in (Business, Product, Document, Partner, Stat, FaqItem, PageMeta):
                model.objects.all().delete()
            self.stdout.write(self.style.WARNING("Flushed CMS tables."))

        self._seed_businesses()
        self._seed_products()
        self._seed_documents()
        self._seed_partners()
        self._seed_stats()
        self._seed_faq()
        self._seed_page_meta()
        self._seed_about()
        self.stdout.write(self.style.SUCCESS("CMS seeded."))

    def _seed_businesses(self):
        for i, b in enumerate(load("businesses")):
            Business.objects.update_or_create(
                slug=b["slug"],
                defaults=dict(
                    order=i,
                    label=b["label"],
                    heading=b["heading"],
                    description=b["description"],
                    card_heading=b["cardHeading"],
                    card_text=b["cardText"],
                    body_text=b["bodyText"],
                    strategy_heading=b["strategyHeading"],
                    strategy_desc=b["strategyDesc"],
                    features=b["features"],
                    image1=b["image1"],
                    image2=b["image2"],
                    image3=b["image3"],
                    cta_image=b["ctaImage"],
                ),
            )
        self.stdout.write(f"  businesses: {Business.objects.count()}")

    def _seed_products(self):
        for i, p in enumerate(load("products")):
            specs = p.get("specs", {})
            Product.objects.update_or_create(
                product_id=p["id"],
                defaults=dict(
                    slug=p["slug"],
                    gender=p["gender"],
                    name=p["name"],
                    description=p["description"],
                    image=p["image"],
                    fabric=specs.get("fabric", ""),
                    composition=specs.get("composition", ""),
                    weight=specs.get("weight", ""),
                    sizes=p.get("sizes", []),
                    order=i,
                ),
            )
        self.stdout.write(f"  products: {Product.objects.count()}")

    def _seed_documents(self):
        for i, d in enumerate(load("documents")):
            Document.objects.update_or_create(
                slug=d["slug"],
                defaults=dict(
                    object_name=d["objectName"],
                    download_file_name=d.get("downloadFileName", ""),
                    order=i,
                ),
            )
        self.stdout.write(f"  documents: {Document.objects.count()}")

    def _seed_partners(self):
        for i, p in enumerate(load("partners")):
            Partner.objects.update_or_create(
                name=p["name"], defaults=dict(logo=p["logo"], order=i)
            )
        self.stdout.write(f"  partners: {Partner.objects.count()}")

    def _seed_stats(self):
        Stat.objects.all().delete()
        for i, s in enumerate(load("stats")):
            Stat.objects.create(
                target=s["target"],
                unit=s.get("unit", ""),
                show_plus=s.get("showPlus", False),
                icon=s["icon"],
                label=s["label"],
                order=i,
            )
        self.stdout.write(f"  stats: {Stat.objects.count()}")

    def _seed_faq(self):
        faq = load("faq")  # locale-keyed: {en:{title,...,items:[...]}, uz:{...}}

        def loc(field):
            return {l: faq.get(l, {}).get(field, "") for l in LOCALES}

        settings_obj = FaqSettings.load()
        settings_obj.title = loc("title")
        settings_obj.subtitle = loc("subtitle")
        settings_obj.still_have_questions = loc("stillHaveQuestions")
        settings_obj.still_have_desc = loc("stillHaveDesc")
        settings_obj.schedule_call = loc("scheduleCall")
        settings_obj.save()

        FaqItem.objects.all().delete()
        items_by_locale = {l: faq.get(l, {}).get("items", []) for l in LOCALES}
        count = len(items_by_locale["en"])

        def field_at(locale, index, key):
            items = items_by_locale.get(locale) or items_by_locale["en"]
            if index >= len(items):
                items = items_by_locale["en"]
            return items[index].get(key, "")

        for i in range(count):
            question = {l: field_at(l, i, "question") for l in LOCALES}
            answer = {l: field_at(l, i, "answer") for l in LOCALES}
            FaqItem.objects.create(question=question, answer=answer, order=i)
        self.stdout.write(f"  faq items: {FaqItem.objects.count()}")

    def _seed_page_meta(self):
        for page, meta in load("page-metadata").items():
            PageMeta.objects.update_or_create(
                page=page,
                defaults=dict(
                    heading=meta.get("heading", {}),
                    title=meta.get("title", {}),
                    description=meta.get("description", {}),
                ),
            )
        self.stdout.write(f"  page metadata: {PageMeta.objects.count()}")

    def _seed_about(self):
        about = AboutPage.load()
        about.content = load("about")
        about.save()
        self.stdout.write("  about: 1")
