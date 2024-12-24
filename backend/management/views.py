from ast import parse
import json
from django.http import JsonResponse
from django.shortcuts import render
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from datetime import timedelta
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.utils.dateparse import parse_date
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now


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


@csrf_exempt
def create_booking(request, property_id):
    if request.method == "POST":
        # Parse the JSON data sent in the request
        try:
            data = json.loads(request.body)
            print(f"Received booking data: {data}")
            check_in_date = data.get("check_in_date")
            check_out_date = data.get("check_out_date")
            total_price = data.get("total_price")
            user_email = data.get("user_email")
            property_id = int(property_id)
            print("done")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

        # Ensure the dates are valid
        try:
            property = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return JsonResponse({"error": "Property not found."}, status=404)

        # Check for property availability
        unavailable_dates = PropertyUnavailableDate.objects.filter(
            property=property,
            start_date__lte=check_out_date,
            end_date__gte=check_in_date,
        )
        if unavailable_dates.exists():
            return JsonResponse(
                {"error": "The property is not available for the selected dates."},
                status=400,
            )
        print("done2")
        user_profile = UserProfile.objects.get(email=user_email)
        booking = Booking(
            user=user_profile,
            property=property,
            start_date=check_in_date,
            end_date=check_out_date,
            total_price=total_price,
            status="Confirmed",
            
        )
        booking.save()
        PropertyUnavailableDate.objects.create(
            property=property, start_date=check_in_date, end_date=check_out_date,by_owner=False,
        )

        return JsonResponse({"message": "Booking confirmed successfully!"}, status=200)

    return JsonResponse({"error": "Invalid request method."}, status=400)


@api_view(["GET"])
def get_properties(request):
    """
    Get all properties irrespective of the owner.
    """
    try:
        # Fetch all properties from the database
        properties = Property.objects.all()
        print(properties)
        serializer = PropertySerializer1(properties, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_property_details(request, property_id):
    """
    Get details of a specific property by its ID and owner ID.
    """
    try:
        # Fetch property by owner and property ID
        property_instance = Property.objects.get(id=property_id)
        serializer = PropertySerializer(property_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Property.DoesNotExist:
        return Response(
            {"error": "Property not found for the given owner."},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["PUT"])
def update_property(request, property_id):
    """
    Update a specific property by its ID and owner ID.
    """
    try:
        # Fetch property by owner and property ID
        property_instance = Property.objects.get(id=property_id)

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


@api_view(["DELETE"])
def delete_property(request, property_id):
    """
    Delete a specific property by its ID and owner ID.
    """
    try:
        # Fetch property by owner and property ID
        property_instance = Property.objects.get(id=property_id)

        # Delete the property
        property_instance.delete()

        return Response(
            {"message": "Property successfully deleted."}, status=status.HTTP_200_OK
        )

    except Property.DoesNotExist:
        return Response(
            {"error": "Property not found for the given owner."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_bookings(request, user_id):
    """
    Get all bookings for a specific user using a GET request.
    """
    try:
        # Fetch the user by the provided user_id
        user = UserProfile.objects.filter(id=user_id).first()

        # Check if the user exists
        if not user:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Fetch bookings for the user
        bookings = Booking.objects.filter(user=user)

        # Serialize the bookings
        serializer = BookingSerializer(bookings, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_user_reserved_properties(request, user_id):
    """
    Récupérer les propriétés réservées par l'utilisateur connecté dont la date de début est passée.
    """
    try:
        # Assurez-vous que l'utilisateur est authentifié
        print(request)

        # Trouver le UserProfile associé à l'utilisateur connecté
        try:
            user_profile = UserProfile.objects.filter(id=user_id).first()
        except UserProfile.DoesNotExist:
            return Response(
                {"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Filtrer les réservations
        bookings = Booking.objects.filter(
            user=user_profile, start_date__lte=now().date(), status="Confirmed"
        )

        # Récupérer les propriétés
        properties = [booking.property for booking in bookings]
        property_data = [{"id": prop.id, "name": prop.name} for prop in properties]
        print(property_data)
        return Response(property_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def create_review(request):

    try:
        user_id = request.data.get("user_id")
        about_lodgini = request.data.get("about_lodgini", False)
        if not about_lodgini:
            property_id = request.data.get("property_id")
        review_text = request.data.get("review")
        stars = request.data.get("stars")
        print(request.data)
        # Vérification des données
        if not user_id or not review_text or not stars:
            return Response(
                {"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST
            )

        # If the review is about a property, we must have a valid property_id
        if not about_lodgini and not property_id:
            return Response(
                {"error": "Property ID is required for property reviews"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Retrieve the user
        user = UserProfile.objects.filter(id=user_id).first()
        if not user:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Retrieve the property if the review is not about Lodgini
        if not about_lodgini:
            property_obj = Property.objects.filter(id=property_id).first()
            if not property_obj:
                return Response(
                    {"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND
                )
        else:
            property_obj = None  # No property needed for Lodgini review

        # Creating the review
        review = Review.objects.create(
            user=user,
            property=property_obj,  # Will be None if about_lodgini is True
            review=review_text,
            stars=stars,
            about_lodgini=about_lodgini,
        )

        # Success response
        return Response(
            {"message": "Review created successfully", "review_id": review.id},
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        # Log the exception for debugging
        print("Error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_user_reviews(request, user_id):
    """
    Récupérer toutes les critiques de l'utilisateur connecté
    """
    try:
        reviews = Review.objects.filter(
            user__id=user_id
        )  # Filter reviews based on user ID
        review_data = [
            {
                "property": "Lodgini" if review.about_lodgini else review.property.name,
                "review": review.review,
                "stars": review.stars,
                "created_at": review.created_at,
            }
            for review in reviews
        ]
        return Response(review_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_lodgini_reviews(request):
    try:
        reviews = Review.objects.filter(about_lodgini=True)
        reviews_data = [
            {
                "name": review.user.name,
                "description": review.review,
                "stars": review.stars,
                "date": review.created_at.isoformat(),
                "profileImageUrl": (
                    review.user.profile_picture.url
                    if review.user.profile_picture
                    else ""
                ),  # Convert to URL
            }
            for review in reviews
        ]
        print(f"reviews are: {reviews}")
        return JsonResponse(reviews_data, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def get_property_reviews(request, property_id):
    try:
        reviews = Review.objects.filter(property_id=property_id, about_lodgini=False)
        reviews_data = [
            {
                "user": review.user.name,
                "review": review.review,
                "stars": review.stars,
                "created_at": review.created_at,
                "profileImageUrl": (
                    review.user.profile_picture.url
                    if review.user.profile_picture
                    else ""
                ),  # Convert to URL
            }
            for review in reviews
        ]
        print(reviews)
        return JsonResponse({"reviews": reviews_data}, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(["DELETE"])
def cancel_booking(request, booking_id):
    """
    Cancel a booking and delete associated unavailability.
    """
    try:
        # Fetch the booking by the provided booking_id
        booking = Booking.objects.filter(id=booking_id).first()
        print(booking)
        # Check if the booking exists
        if not booking:
            return Response(
                {"error": "Booking not found."}, status=status.HTTP_404_NOT_FOUND
            )

        property = booking.property

        # Find all unavailable dates for this property that overlap with the booking dates
        unavailabilities = PropertyUnavailableDate.objects.filter(
            property=property,
            start_date__lte=booking.end_date,  # Start date should be before or on the booking's end date
            end_date__gte=booking.start_date   # End date should be after or on the booking's start date
        )        
        print(unavailabilities)
        unavailabilities.delete()
        booking.delete()

        return Response(
            {"message": "Booking and associated unavailability successfully deleted."},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_unavailable_dates(request, property_id):
    unavailable_dates = PropertyUnavailableDate.objects.filter(property_id=property_id)
    dates = []
    for date_range in unavailable_dates:
        current_date = date_range.start_date
        while current_date <= date_range.end_date:
            dates.append({
                "date": current_date.strftime('%Y-%m-%d'),
                "by_owner": date_range.by_owner
            })
            current_date += timedelta(days=1)
    print(dates)
    return Response(dates)
