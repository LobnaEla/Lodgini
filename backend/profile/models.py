from django.db import models
from django.contrib.auth.models import User
# Create your models here.

from .models import *
class UserProfile(models.Model):
    # Link to the default User model
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Custom fields
 
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    name = models.CharField(max_length=15, blank=False, null=True)

    # Add any other fields you need for your application
    location = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s user Profile"
    
class OwnerProfile(models.Model):
    # Link to the default User model
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Custom fields
 
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    name = models.CharField(max_length=15, blank=False, null=True)

    # Add any other fields you need for your application
    location = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s owner Profile"
    
