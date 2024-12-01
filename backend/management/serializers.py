from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            'name', 'description', 'property_type', 'furnishing_type', 'location', 
            'price_per_night', 'number_of_bedrooms', 'number_of_living_rooms', 
            'number_of_bathrooms', 'number_of_dining_rooms', 'max_number_guests', 
            'wifi_speed', 'number_of_refrigerators', 'number_of_tvs'
        ]

    def validate(self, data):
        # You can add custom validation logic here
        if not data.get('price_per_night'):
            raise serializers.ValidationError("Price per night is required.")
        return data
