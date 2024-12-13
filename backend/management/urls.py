from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns =[
    path('create_booking/<int:owner_id>/<int:property_id>/',create_booking, name ="create_booking"),
    path("add_property/", add_property, name="add_property"),
    path("properties/<int:owner_id>/", get_properties, name="get_properties"),
    path("properties/", get_all_properties, name="get_all_properties"),
    path('lodgini_reviews/', get_lodgini_reviews, name='lodgini_reviews'),

    path(
        "properties/<int:owner_id>/<int:property_id>/",
        get_property_details_by_owner,
        name="get_property_details_by_owner",
    ),
    path('user_reviews/<int:user_id>/', get_user_reviews, name='get_user_reviews'),

    path('create_review/', create_review, name='create_review'),
    path('bookings/<int:user_id>/', get_bookings, name='get_bookings'),
    path('reserved_properties/<int:user_id>/', get_user_reserved_properties, name='reserved-properties'),
    path(
        "properties/<int:owner_id>/<int:property_id>/update/",
        update_property,
        name="update_property",
    ),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
