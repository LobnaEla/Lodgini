from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("add_property/", add_property, name="add_property"),
    path("properties/", get_properties, name="get_properties"),
    path(
        "properties/<int:property_id>/",
        get_property_details,
        name="get_property_details",
    ),
    path(
        "properties/<int:property_id>/update/",
        update_property,
        name="update_property",
    ),
    path(
        "properties/<int:property_id>/delete/",
        delete_property,
        name="delete_property",
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
