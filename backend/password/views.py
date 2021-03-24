from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PasswordSerializer
from .models import Password

# Create your views here.

class PasswordView(viewsets.ModelViewSet):
    serializer_class = PasswordSerializer
    queryset = Password.objects.all()

    