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
<<<<<<< HEAD
    )  
=======
    ),
<<<<<<< HEAD
    path(
        "properties/<int:owner_id>/<int:property_id>/update/",
        update_property,
        name="update_property",
    ),
=======
    
>>>>>>> 7dc03a8bdba5fd91fa273e246824f35a3a24b9e8
>>>>>>> cdd2328bcf5e3c3c2219c65c6e8a4c6afb574234
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
