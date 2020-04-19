from django.shortcuts import render
from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (
    BerkasLKN,
    BarangBukti,
    StatusBarangBukti,
    Penangkapan,
    ProsesPengadilan,
    ProsesTersangka,
    Tersangka,
    StatusTersangka,

)
from .serializer import BerkasLknApi, PenangkapanApi, TersangkaApi, ProsesPengadilanApi, TersangkaEditApi, BarangBuktiEdit, LknDetailAPi
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend


class BerkasLknView(viewsets.ModelViewSet):
    queryset = BerkasLKN.objects.all()
    serializer_class = BerkasLknApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'LKN']

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(penyidik=self.request.user)
        return query_set

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        serializer = BerkasLKN(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PenangkapanView(viewsets.ModelViewSet):
    queryset = Penangkapan.objects.all()
    serializer_class = PenangkapanApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'no_penangkapan','no_lkn__LKN','no_lkn']

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        queryset = Penangkapan.objects.all()
        if not user.is_superuser:
            queryset = Penangkapan.objects.filter(
                no_lkn__penyidik=self.request.user)

        return queryset

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        serializer = Penangkapan(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TersangkaView(viewsets.ModelViewSet):
    queryset = Tersangka.objects.all()
    serializer_class = TersangkaApi

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        queryset = Tersangka.objects.all()
        if not user.is_superuser:
            queryset = Tersangka.objects.filter(
                no_penangkapan_id__no_lkn__penyidik=self.request.user)

        return queryset

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        serializer = Tersangka(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProsesPengadilanView(viewsets.ModelViewSet):
    queryset = ProsesPengadilan.objects.all()
    serializer_class = ProsesPengadilanApi

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        serializer = ProsesPengadilan(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TersangkaEditDetailView(viewsets.ModelViewSet):
    queryset = Tersangka.objects.all()
    serializer_class = TersangkaEditApi

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        queryset = Tersangka.objects.all()
        if not user.is_superuser:
            queryset = Tersangka.objects.filter(
                no_penangkapan_id__no_lkn__penyidik=self.request.user)
        return queryset

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        serializer = Tersangka(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BarangBuktiEditView(viewsets.ModelViewSet):
    queryset = BarangBukti.objects.all()
    serializer_class = BarangBuktiEdit

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        queryset = BarangBukti.objects.all()
        if not user.is_superuser:
            queryset = BarangBukti.objects.filter(
                milik_tersangka_id__no_penangkapan_id__no_lkn__penyidik=self.request.user)
        return queryset

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        serializer = BarangBukti(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LknDetailApiView(viewsets.ReadOnlyModelViewSet):
    queryset = BerkasLKN.objects.all()
    serializer_class = LknDetailAPi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'LKN']

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        if not user.is_superuser:
            queryset = queryset.filter(penyidik=self.request.user)
        return queryset

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticatedOrReadOnly]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]
