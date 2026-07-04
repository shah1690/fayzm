from django.urls import path

from . import views

app_name = "cms"

urlpatterns = [
    path("businesses/", views.BusinessList.as_view(), name="businesses"),
    path("products/", views.ProductList.as_view(), name="products"),
    path("documents/", views.DocumentList.as_view(), name="documents"),
    path("partners/", views.PartnerList.as_view(), name="partners"),
    path("stats/", views.StatList.as_view(), name="stats"),
    path("page-metadata/", views.PageMetaList.as_view(), name="page-metadata"),
    path("faq/", views.FaqView.as_view(), name="faq"),
    path("about/", views.AboutView.as_view(), name="about"),
]
