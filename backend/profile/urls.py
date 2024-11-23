from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
router = DefaultRouter()

urlpatterns = [
    path('sign_up/', signup, name='signup'),
    path('Sign_up_as_owner/', signupowner, name='signupowner'), 
]
