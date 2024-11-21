# views.py
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import UserProfile
from .serializers import UserProfileSerializer

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Sauvegarde l'utilisateur
            return redirect('success')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
