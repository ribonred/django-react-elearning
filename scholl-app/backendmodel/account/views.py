from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ApiUser, UserSerializerWithToken, UserRegistrations
from backendmodel.core.models import User
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly,IsAdminUser, BasePermission
from rest_framework_jwt.authentication import JSONWebTokenAuthentication, BaseJSONWebTokenAuthentication
from rest_framework_jwt.views import ObtainJSONWebToken
from rest_framework_jwt.settings import api_settings
from django.http import Http404
from rest_framework.parsers import FileUploadParser, FormParser, MultiPartParser


class IsManager(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return bool(request.user.is_superuser)



class ApiUserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserRegistrations
    parser_class = (FileUploadParser,)

    def get_object(self):
        obj = User.objects.get(id=self.kwargs['pk'])
        return obj

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action == 'list':
            permission_classes = [IsManager]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            self.serializer_class =ApiUser
            permission_classes = [IsManager,IsAuthenticated]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        serializer = UserRegistrations(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def update(self, request, *args, **kwargs):
        try:
            instance = User.objects.get(pk=kwargs['pk'])
            serializer = ApiUser(instance=instance,data=request.data)

            if serializer.is_valid():
                serializer.save()
                instance.set_password(serializer.data.get('password'))
                instance.save()
                success = Response(serializer.data,status=status.HTTP_200_OK)
                print("success",success.data)
                return success
            error = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(error.data)
            return error
        except User.DoesNotExist:
            serializer = ApiUser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
