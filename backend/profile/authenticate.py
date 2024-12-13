from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from .models import UserProfile, OwnerProfile

class UserProfileBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            user = UserProfile.objects.get(username=username)
            if check_password(password, user.password):
                return user
        except UserProfile.DoesNotExist:
            return None

class OwnerProfileBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            owner = OwnerProfile.objects.get(username=username)
            if check_password(password, owner.password):
                return owner
        except OwnerProfile.DoesNotExist:
            return None
