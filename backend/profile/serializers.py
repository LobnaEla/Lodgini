from rest_framework import serializers
from .models import UserProfile, OwnerProfile

class UserProfileSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(max_length=8, min_length=8)
    class Meta:
        model = UserProfile
        fields = ['email', 'password', 'id', 'phone_number', 'name', 'country']

class OwnerProfileSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(max_length=8, min_length=8)
    class Meta:
        model = OwnerProfile
        fields = ['email', 'password', 'id', 'phone_number', 'name', 'country']

    

