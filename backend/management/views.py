from ast import parse
import json
from django.http import JsonResponse
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
from django.views.decorators.csrf import csrf_exempt



@api_view(["POST"])
def add_property(request):
    # Get the owner's email from the request data
    owner_email = request.data.get("owner_email")
    print(f"Owner email from request: {owner_email}")  # Debugging line

    if owner_email:
        # Retrieve owner instance using the email
        try:
            owner = OwnerProfile.objects.get(
                email=owner_email
            )  # Adjust based on your model
            print(f"Owner found: {owner}")  # Debugging line
        except OwnerProfile.DoesNotExist:
            print("Owner not found")  # Debugging line
            return Response(
                {"error": "Owner not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Make request.data mutable
        mutable_data = request.data.copy()

        # Add the owner ID to the request data
        mutable_data["owner"] = owner.id  # Use owner_id, not owner
        furnishing_type = mutable_data["furnishing_type"]
        if isinstance(furnishing_type, str):
            furnishing_type = furnishing_type.split(",")
            mutable_data["furnishing_type"] = furnishing_type[0]
            print(
                f"Furnishing type as list: {mutable_data['furnishing_type']}"
            )  # Debugging line

        del mutable_data["owner_email"]  # Remove owner_email from the data
        print(
            f"Request data after deleting owner_email: {mutable_data}"
        )  # Debugging line

        # Serialize the data
        serializer = PropertySerializer(data=mutable_data)

        # Check if the data is valid
        if serializer.is_valid():
            # Create the property instance (owner is now part of mutable_data)
            property_instance = (
                serializer.save()
            )  # Don't pass owner here, it's already in mutable_data
            print(f"Property created with ID: {property_instance.id}")  # Debugging line

            return Response(
                {
                    "message": "Property created successfully!",
                    "property_id": property_instance.id,
                },
                status=status.HTTP_201_CREATED,
            )

        print(f"Serializer errors: {serializer.errors}")  # Debugging line
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )

    print("Owner email not provided in request")  # Debugging line
    return Response({'error': 'Owner email is required'}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def create_booking(request, owner_id, property_id):
    if request.method == 'POST':
        # Parse the JSON data sent in the request
        try:
            data = json.loads(request.body)
            print(f"Received booking data: {data}")
            check_in_date = data.get('check_in_date')
            check_out_date = data.get('check_out_date')
            total_price = data.get('total_price')           
            user_email = data.get('user_email')
            owner_id = int(owner_id)
            property_id = int(property_id)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)


        # Ensure the dates are valid
        try:
            property = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return JsonResponse({'error': 'Property not found.'}, status=404)

        # Check for property availability
        unavailable_dates = PropertyUnavailableDate.objects.filter(
            property=property,
            start_date__lte=check_out_date,
            end_date__gte=check_in_date
        )
        if unavailable_dates.exists():
            return JsonResponse({'error': 'The property is not available for the selected dates.'}, status=400)

        user_profile = UserProfile.objects.get(email=user_email)
        booking = Booking(
            user=user_profile,
            property=property,
            start_date=check_in_date,
            end_date=check_out_date,
            total_price=total_price,
            status="Confirmed"
        )
        booking.save()
        PropertyUnavailableDate.objects.create(
            property=property,
            start_date=check_in_date,
            end_date=check_out_date
        )

        return JsonResponse({'message': 'Booking confirmed successfully!'}, status=200)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)


@api_view(["GET"])
def get_properties(request, owner_id):
    """
    Get all properties for a specific owner using a GET request.
    """
    try:
        # Fetch the owner by the provided owner_id
        owner = OwnerProfile.objects.filter(id=owner_id).first()

        # Check if the owner exists
        if not owner:
            return Response(
                {"error": "Owner not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Fetch properties for the owner
        properties = Property.objects.filter(owner=owner)
        serializer = PropertySerializer(properties, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_all_properties(request):
    """
    Get all properties irrespective of the owner.
    """
    try:
        # Fetch all properties from the database
        properties = Property.objects.all()
        serializer = PropertySerializer(properties, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_property_details_by_owner(request, owner_id, property_id):
    """
    Get details of a specific property by its ID and owner ID.
    """
    try:
        # Fetch property by owner and property ID
        property_instance = Property.objects.get(id=property_id, owner_id=owner_id)
        serializer = PropertySerializer(property_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Property.DoesNotExist:
        return Response(
            {"error": "Property not found for the given owner."},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["PUT"])
def update_property(request, owner_id, property_id):
    """
    Update a specific property by its ID and owner ID.
    """
    try:
        # Fetch property by owner and property ID
        property_instance = Property.objects.get(id=property_id, owner_id=owner_id)

        # Create a mutable copy of the request data
        update_data = request.data.copy()

        # Remove stars from updateable fields
        if "number_of_stars" in update_data:
            del update_data["number_of_stars"]

        # Handle file uploads
        for img_field in ["image1", "image2", "image3"]:
            if img_field in request.FILES:
                setattr(property_instance, img_field, request.FILES[img_field])

        # Serialize and update
        serializer = PropertySerializer(
            property_instance, data=update_data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Property.DoesNotExist:
        return Response(
            {"error": "Property not found for the given owner."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
