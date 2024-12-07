from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("add_property/", add_property, name="add_property"),
    path("properties/<int:owner_id>/", get_properties, name="get_properties"),
    path("properties/", get_all_properties, name="get_all_properties"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
