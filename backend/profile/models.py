from django.db import models
# Create your models here.

from .models import *
class UserProfile(models.Model):
    # Custom fields
    email = models.EmailField(unique=True, blank=False, null=False, default="default@example.com")
    password = models.CharField(max_length=128, blank=False, null=False, default="default_password")
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    phone_number = models.CharField(max_length=8, blank=True, null=True)
    name = models.CharField(max_length=15, blank=False, null=True)
    country = models.CharField(max_length=15, blank=False, null=True)

    # Add any other fields you need for your application
 
    def __str__(self):
        return f"{self.name}'s user Profile"
    
class OwnerProfile(models.Model):
  

    # Custom fields
    email = models.EmailField(unique=True, blank=False, null=False, default="default@example.com")
    password = models.CharField(max_length=128, blank=False, null=False,  default="default_password")
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    phone_number = models.CharField(max_length=8, blank=True, null=True)
    name = models.CharField(max_length=15, blank=False, null=True)
    country = models.CharField(max_length=15, blank=False, null=True)
    # Add any other fields you need for your application
   

    def __str__(self):
        return f"{self.name}'s owner Profile"
    
