from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

    def validate(self, data):
        # You can add custom validation logic here
        if not data.get('price_per_night'):
            raise serializers.ValidationError("Price per night is required.")
        return data
