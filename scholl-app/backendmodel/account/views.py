from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ApiUser
from backendmodel.core.models import User
from rest_framework import viewsets


class ApiUserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ApiUser

    def post(self, request, format=None):
        serializer = ApiUser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
