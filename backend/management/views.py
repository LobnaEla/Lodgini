from django.shortcuts import render
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import PropertySerializer
from datetime import timedelta
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.utils.dateparse import parse_date


@api_view(['POST'])
def add_property(request):
    # Get the owner's email from the request data
    owner_email = request.data.get('owner_email')
    print(f"Owner email from request: {owner_email}")  # Debugging line

    if owner_email:
        # Retrieve owner instance using the email
        try:
            owner = OwnerProfile.objects.get(email=owner_email)  # Adjust based on your model
            print(f"Owner found: {owner}")  # Debugging line
        except OwnerProfile.DoesNotExist:
            print("Owner not found")  # Debugging line
            return Response({'error': 'Owner not found'}, status=status.HTTP_404_NOT_FOUND)

        # Make request.data mutable
        mutable_data = request.data.copy()

        # Add the owner ID to the request data
        mutable_data['owner'] = owner.id  # Use owner_id, not owner
        furnishing_type = mutable_data['furnishing_type']
        if isinstance(furnishing_type, str):
                furnishing_type = furnishing_type.split(',')
                mutable_data['furnishing_type'] = furnishing_type[0]
                print(f"Furnishing type as list: {mutable_data['furnishing_type']}")  # Debugging line

        del mutable_data['owner_email']  # Remove owner_email from the data
        print(f"Request data after deleting owner_email: {mutable_data}")  # Debugging line

        # Serialize the data
        serializer = PropertySerializer(data=mutable_data)

        # Check if the data is valid
        if serializer.is_valid():
            # Create the property instance (owner is now part of mutable_data)
            property_instance = serializer.save()  # Don't pass owner here, it's already in mutable_data
            print(f"Property created with ID: {property_instance.id}")  # Debugging line

            return Response({'message': 'Property created successfully!', 'property_id': property_instance.id}, status=status.HTTP_201_CREATED)
        
        print(f"Serializer errors: {serializer.errors}")  # Debugging line
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    print("Owner email not provided in request")  # Debugging line
    return Response({'error': 'Owner email is required'}, status=status.HTTP_400_BAD_REQUEST)


def create_booking(request, owner_id, property_id):
    if request.method == 'POST':
        check_in_date = request.POST.get('checkInDate')
        check_out_date = request.POST.get('checkOutDate')
        total_price = request.POST.get('totalPrice')

        check_in_date = parse_date(check_in_date)
        check_out_date = parse_date(check_out_date)

        property = Property.objects.get(id=property_id)

        unavailable_dates = PropertyUnavailableDate.objects.filter(
            property=property,
            start_date__lte=check_out_date,
            end_date__gte=check_in_date
        )
        if unavailable_dates.exists():
            return JsonResponse({'error': 'The property is not available for the selected dates.'}, status=400)

        user = request.user

        booking = Booking(
            user=user,
            property=property,
            start_date=check_in_date,
            end_date=check_out_date,
            total_price=total_price,
        )
        booking.save()
        current_date = check_in_date
        while current_date <= check_out_date:
            PropertyUnavailableDate.objects.get_or_create(
                property=property, start_date=current_date, end_date=current_date
            )
            current_date += timedelta(days=1)

        return JsonResponse({'message': 'Booking confirmed successfully!'}, status=200)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)