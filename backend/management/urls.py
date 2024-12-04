from django.urls import path
from .views import *

urlpatterns = [
    path("add_property/", add_property, name="add_property"),
    path("properties/<int:owner_id>/", get_properties, name="get_properties"),
]
