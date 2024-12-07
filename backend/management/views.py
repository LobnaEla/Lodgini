from django.http import JsonResponse
from django.shortcuts import render
from .models import Property, OwnerProfile
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import PropertySerializer


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
    return Response(
        {"error": "Owner email is required"}, status=status.HTTP_400_BAD_REQUEST
    )


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
