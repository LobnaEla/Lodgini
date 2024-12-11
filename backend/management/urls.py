from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns =[
    path('create_booking/<int:owner_id>/<int:property_id>/',create_booking, name ="create_booking"),
    path("add_property/", add_property, name="add_property"),
    path("properties/<int:owner_id>/", get_properties, name="get_properties"),
    path("properties/", get_all_properties, name="get_all_properties"),
    path(
        "properties/<int:owner_id>/<int:property_id>/",
        get_property_details_by_owner,
        name="get_property_details_by_owner",
    ),
    path(
        "properties/<int:owner_id>/<int:property_id>/update/",
        update_property,
        name="update_property",
    ),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
