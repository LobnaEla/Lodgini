from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
router = DefaultRouter()
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('sign_up/', signup, name='signup'),
    path('Sign_up_as_owner/', signupowner, name='signupowner'), 
    path('Sign_in/', login_user, name='login_user'),
    path('Sign_in_as_owner/', login_owner, name='login_owner'),
    path('owner_profile/update_picture/', update_profile_picture, name='update_profile_picture'),
    path('owner_profile/<int:owner_id>/', get_owner_profile, name='get_owner_profile'),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
