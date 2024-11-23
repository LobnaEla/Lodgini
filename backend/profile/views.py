# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserProfileSerializer, OwnerProfileSerializer

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
