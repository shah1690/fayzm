"""Read-only public API for all CMS content."""

from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

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
