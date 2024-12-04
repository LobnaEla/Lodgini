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

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Sauvegarde l'utilisateur
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signupowner(request):
    if request.method == 'POST':
        serializer = OwnerProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Sauvegarde l'utilisateur
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            # Load the data from the POST request
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Log the email received
            print(f"Received email: {email}")

            # Check if the user exists in the database
            user = UserProfile.objects.filter(email=email).first()

            # Log the user object to see if it's found
            if user:
                print(f"User found: {user.email}")
            else:
                print("User not found")

            # Verify the password if user is found
            if user and (password==user.password):
                return JsonResponse({'message': 'Login successful!' , 'name': user.name,
                    'email': user.email,
                    'phone_number': user.phone_number,
                    'country': user.country,
                    'profile_picture': user.profile_picture.url if user.profile_picture else None }, status=200)
            else:
                return JsonResponse({'error': 'Invalid email or password'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Bad request'}, status=400)


@csrf_exempt
def login_owner(request):
    if request.method == 'POST':
        try:
            # Load the data from the POST request
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Log the email received
            print(f"Received email: {email}")

            # Check if the user exists in the database
            user = OwnerProfile.objects.filter(email=email).first()

            # Log the user object to see if it's found
            if user:
                print(f"User found: {user.email} d'id {user.id}")
            else:
                print("User not found")

            # Verify the password if user is found
            if user and (password==user.password):
                request.session['owner_email'] = user.email
                return JsonResponse({'message': 'Login successful!' ,  'name': user.name,
                    'email': user.email,
                    'phone_number': user.phone_number,
                    'country': user.country,
                    'id': user.id,
                    'profile_picture': user.profilepicture.url if user.profilepicture else None}, status=200)
            else:
                return JsonResponse({'error': 'Invalid email or password'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Bad request'}, status=400)

@csrf_exempt
def update_profile_picture(request):
    if request.method == 'POST':
        user_email = request.POST.get('email')
        profilepicture = request.FILES.get('profile_picture')

        if not user_email or not profilepicture:
            return JsonResponse({'success': False, 'message': 'Email or file not provided'}, status=400)

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

            return JsonResponse({'success': True, 'profilePictureUrl': owner_profile.profilepicture.url})

        except OwnerProfile.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Owner not found'}, status=404)
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)

    return JsonResponse({'success': False, 'message': 'Invalid request'}, status=400)

def get_owner_profile(request, owner_id):
    owner = get_object_or_404(OwnerProfile, id=owner_id)
    owner_data = {
        'name': owner.name,
        'email': owner.email,
        'phoneNumber': owner.phone_number,
        'country': owner.country,
        'profilePicture': owner.profilepicture.url if owner.profilepicture else None  # URL de l'image
    }
    return JsonResponse(owner_data)