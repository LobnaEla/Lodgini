# views.py
from django.views.decorators.csrf import csrf_exempt
import json
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
                return JsonResponse({'message': 'Login successful!' , 'name': user.name }, status=200)
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
                print(f"User found: {user.email}")
            else:
                print("User not found")

            # Verify the password if user is found
            if user and (password==user.password):
                return JsonResponse({'message': 'Login successful!' ,  'name': user.name,
                    'email': user.email,
                    'phone_number': user.phone_number,
                    'country': user.country,
                    'profile_picture': user.profile_picture.url if user.profile_picture else None}, status=200)
            else:
                return JsonResponse({'error': 'Invalid email or password'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Bad request'}, status=400)