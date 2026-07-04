"""Read-only public API for all CMS content."""

from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from django.forms.models import model_to_dict

from .models import (
    AboutPage,
    Business,
    Document,
    FaqItem,
    FaqSettings,
    HomeCollections,
    HomeContact,
    HomeCta,
    HomeCtaBanner,
    HomeHero,
    HomeIntro,
    HomeWorldMap,
    PageMeta,
    Partner,
    Product,
    Stat,
)
from .serializers import (
    AboutPageSerializer,
    BusinessSerializer,
    DocumentSerializer,
    FaqItemSerializer,
    FaqSettingsSerializer,
    PageMetaSerializer,
    PartnerSerializer,
    ProductSerializer,
    StatSerializer,
)


class PublicListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    pagination_class = None


class BusinessList(PublicListView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer


class ProductList(PublicListView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        gender = self.request.query_params.get("gender")
        return qs.filter(gender=gender) if gender in {"women", "men"} else qs


class DocumentList(PublicListView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


class PartnerList(PublicListView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer


class StatList(PublicListView):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


class PageMetaList(PublicListView):
    queryset = PageMeta.objects.all()
    serializer_class = PageMetaSerializer


class FaqView(APIView):
    """FAQ page: surrounding copy + ordered items."""

    permission_classes = [AllowAny]

    def get(self, request):
        settings_obj = FaqSettings.load()
        items = FaqItem.objects.all()
        return Response(
            {
                "settings": FaqSettingsSerializer(settings_obj).data,
                "items": FaqItemSerializer(items, many=True).data,
            }
        )


class AboutView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(AboutPageSerializer(AboutPage.load()).data)


class HomeView(APIView):
    """All home-page section content as one payload (localized dicts; empty
    fields are omitted so the frontend falls back to its built-in copy)."""

    permission_classes = [AllowAny]

    _SECTIONS = {
        "hero": HomeHero,
        "intro": HomeIntro,
        "collections": HomeCollections,
        "cta": HomeCta,
        "partnerCta": HomeCtaBanner,
        "worldMap": HomeWorldMap,
        "contact": HomeContact,
    }

    def get(self, request):
        payload = {}
        for key, model in self._SECTIONS.items():
            obj = model.load()
            data = model_to_dict(obj, exclude=["id"])
            # camelCase keys, drop empty localized fields
            section = {}
            for field, value in data.items():
                if isinstance(value, dict) and any(v for v in value.values()):
                    camel = "".join(
                        p.capitalize() if i else p
                        for i, p in enumerate(field.split("_"))
                    )
                    section[camel] = value
            payload[key] = section
        return Response(payload)
