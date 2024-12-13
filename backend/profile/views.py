# views.py
import os
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserProfileSerializer, OwnerProfileSerializer
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from django.contrib.auth.models import User


@api_view(["POST"])
def signup(request):
    if request.method == "POST":
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Sauvegarde l'utilisateur
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def signupowner(request):
    if request.method == "POST":
        serializer = OwnerProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Sauvegarde l'utilisateur
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            # Load the data from the POST request
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # Log the email received
            print(f"Received email: {email}")

            # Check if the user exists in the database
            user = UserProfile.objects.filter(email=email).first()

            # Log the user object to see if it's found
            if user:
                print(f"User found: {user.email}  d'id {user.id}")
            else:
                print("User not found")
            print(f"{user.profile_picture}")

            # Verify the password if user is found
<<<<<<< HEAD
            if user and (password == user.password):
                return JsonResponse(
                    {
                        "message": "Login successful!",
                        "name": user.name,
                        "email": user.email,
                        "phone_number": user.phone_number,
                        "country": user.country,
                        "profile_picture": (
                            user.profile_picture.url if user.profile_picture else None
                        ),
                    },
                    status=200,
                )
=======
            if user and (password==user.password):
                return JsonResponse({'message': 'Login successful!' , 'name': user.name,
                    'email': user.email,
                    'phone_number': user.phone_number,
                    'country': user.country,
                    'id': user.id,
                    'profile_picture': user.profile_picture.url if user.profile_picture else None }, status=200)
>>>>>>> 6bb00d02a7a6bc884f4c3af990d341b34c3815da
            else:
                return JsonResponse({"error": "Invalid email or password"}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Bad request"}, status=400)


@csrf_exempt
def login_owner(request):
    if request.method == "POST":
        try:
            # Load the data from the POST request
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # Log the email received
            print(f"Received email: {email}")

            # Check if the user exists in the database
            user = OwnerProfile.objects.filter(email=email).first()

            # Log the user object to see if it's found
            if user:
                print(f"User found: {user.email} d'id {user.id}")
                if user.profilepicture:
                    print(f"Profile picture URL: {user.profilepicture.url}")
                else:
                    print("No profile picture available")
            else:
                print("User not found")

            # Verify the password if user is found
            if user and (password == user.password):
                request.session["owner_email"] = user.email
                return JsonResponse(
                    {
                        "message": "Login successful!",
                        "name": user.name,
                        "email": user.email,
                        "phone_number": user.phone_number,
                        "country": user.country,
                        "id": user.id,
                        "profile_picture": (
                            request.build_absolute_uri(user.profilepicture.url)
                            if user.profilepicture
                            else None
                        ),
                    },
                    status=200,
                )
                if user.profilepicture:
                    print(f"Profile Picture Path: {user.profilepicture.path}")
                    print(
                        f"Profile Picture URL: {request.build_absolute_uri(user.profilepicture.url)}"
                    )
            else:
                return JsonResponse({"error": "Invalid email or password"}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Bad request"}, status=400)


@csrf_exempt
def update_profile_picture_owner(request):
    if request.method == "POST":
        user_email = request.POST.get("email")
        profilepicture = request.FILES.get("profile_picture")

        if not user_email or not profilepicture:
            return JsonResponse(
                {"success": False, "message": "Email or file not provided"}, status=400
            )

        try:
            owner_profile = OwnerProfile.objects.get(email=user_email)

            # Supprimer l'ancienne photo si elle existe
            if owner_profile.profilepicture:
                old_picture_path = owner_profile.profilepicture.path
                if os.path.exists(old_picture_path):
                    os.remove(old_picture_path)

            # Enregistrer la nouvelle photo
            owner_profile.profilepicture.save(profilepicture.name, profilepicture)
            owner_profile.save()
            print(f"{owner_profile.profilepicture.url}")

            return JsonResponse(
                {"success": True, "profilePictureUrl": owner_profile.profilepicture.url}
            )

        except OwnerProfile.DoesNotExist:
            return JsonResponse(
                {"success": False, "message": "Owner not found"}, status=404
            )
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return JsonResponse({"success": False, "message": "Invalid request"}, status=400)


@csrf_exempt  # Pour autoriser les requêtes POST sans vérification CSRF (utile pour les tests, mais à gérer en production)
def update_profile_owner(request):
    try:
        # Récupérer les données JSON envoyées dans la requête
        data = json.loads(request.body)

        # Obtenez l'utilisateur connecté (ou trouvez un autre moyen de récupérer l'utilisateur)
        email = data.get("email")
        owner = OwnerProfile.objects.get(email=email)

        # Mise à jour des champs
        owner.name = data.get("name", owner.name)
        owner.phone_number = data.get("phone_number", owner.phone_number)
        owner.country = data.get("country", owner.country)

        # Mise à jour de l'image si un fichier est envoyé

        owner.save()

        # Répondre avec le succès
        return JsonResponse(
            {
                "success": True,
                "message": "Profile updated successfully",
            }
        )

    except OwnerProfile.DoesNotExist:
        return JsonResponse({"success": False, "message": "User not found"}, status=404)

    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=400)


@csrf_exempt
def update_profile_picture_user(request):
    if request.method == "POST":
        user_email = request.POST.get("email")
        profile_picture = request.FILES.get("profile_picture")

        if not user_email or not profile_picture:
            return JsonResponse(
                {"success": False, "message": "Email or file not provided"}, status=400
            )

        try:
            # Fetch the user profile by email
            user_profile = UserProfile.objects.get(email=user_email)

            # Remove old profile picture if exists
            if user_profile.profile_picture:
                old_picture_path = user_profile.profile_picture.path
                if os.path.exists(old_picture_path):
                    os.remove(old_picture_path)

            # Save the new profile picture
            user_profile.profile_picture.save(profile_picture.name, profile_picture)
            user_profile.save()
            print(f"{profile_picture}")

            # Return the new profile picture URL as a response
            return JsonResponse(
                {"success": True, "profilePictureUrl": user_profile.profile_picture.url}
            )

        except UserProfile.DoesNotExist:
            return JsonResponse(
                {"success": False, "message": "User not found"}, status=404
            )
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return JsonResponse({"success": False, "message": "Invalid request"}, status=400)


@csrf_exempt  # Disable CSRF check for this view (not recommended for production, only for testing purposes)
def update_profile_user(request):
    try:
        # Parse the JSON data from the request
        data = json.loads(request.body)

        # Retrieve the email from the data to fetch the specific owner
        email = data.get("email")
        if not email:
            return JsonResponse(
                {"success": False, "message": "Email is required"}, status=400
            )

        # Get the owner object from the database
        user = UserProfile.objects.get(email=email)

        # Update the fields with the provided data, if available
        user.name = data.get("name", user.name)
        user.phone_number = data.get("phone_number", user.phone_number)
        user.country = data.get("country", user.country)

        # Save the updated owner object
        user.save()
        # Return a success response
        return JsonResponse(
            {
                "success": True,
                "message": "Profile updated successfully",
                "profilePictureUrl": (
                    user.profile_picture.url if user.profile_picture else None
                ),
            }
        )

    except OwnerProfile.DoesNotExist:
        return JsonResponse({"success": False, "message": "User not found"}, status=404)

    except json.JSONDecodeError:
        return JsonResponse(
            {"success": False, "message": "Invalid JSON data"}, status=400
        )

    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)
