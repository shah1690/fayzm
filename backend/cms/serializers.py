"""Serializers shaped to match the frontend's content TS types (camelCase)."""

from rest_framework import serializers

from .models import (
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


class BusinessSerializer(serializers.ModelSerializer):
    cardHeading = serializers.JSONField(source="card_heading")
    cardText = serializers.JSONField(source="card_text")
    bodyText = serializers.JSONField(source="body_text")
    strategyHeading = serializers.JSONField(source="strategy_heading")
    strategyDesc = serializers.JSONField(source="strategy_desc")
    ctaImage = serializers.CharField(source="cta_image")

    class Meta:
        model = Business
        fields = (
            "slug", "label", "heading", "description",
            "cardHeading", "cardText", "bodyText",
            "strategyHeading", "strategyDesc", "features",
            "image1", "image2", "image3", "ctaImage",
        )


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="product_id")
    specs = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ("id", "slug", "gender", "name", "description", "image", "specs", "sizes")

    def get_specs(self, obj):
        return {"fabric": obj.fabric, "composition": obj.composition, "weight": obj.weight}


class DocumentSerializer(serializers.ModelSerializer):
    objectName = serializers.CharField(source="object_name")
    downloadFileName = serializers.CharField(source="download_file_name")

    class Meta:
        model = Document
        fields = ("slug", "objectName", "downloadFileName")


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ("name", "logo")


class StatSerializer(serializers.ModelSerializer):
    showPlus = serializers.BooleanField(source="show_plus")

    class Meta:
        model = Stat
        fields = ("target", "unit", "showPlus", "label", "icon")


class FaqItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaqItem
        fields = ("question", "answer")


class FaqSettingsSerializer(serializers.ModelSerializer):
    stillHaveQuestions = serializers.JSONField(source="still_have_questions")
    stillHaveDesc = serializers.JSONField(source="still_have_desc")
    scheduleCall = serializers.JSONField(source="schedule_call")

    class Meta:
        model = FaqSettings
        fields = ("title", "subtitle", "stillHaveQuestions", "stillHaveDesc", "scheduleCall")


class PageMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageMeta
        fields = ("page", "heading", "title", "description")


class AboutPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPage
        fields = ("content",)
