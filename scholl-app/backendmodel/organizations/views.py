from django.shortcuts import render
from django.shortcuts import render
from rest_framework.parsers import FileUploadParser, FormParser, MultiPartParser
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
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
from .serializer import (
    BerkasLknApi,
    PenangkapanApi,
    TersangkaApi,
    ProsesPengadilanApi,
    TersangkaEditApi,
    BarangBuktiEdit,
    LknDetailAPi,
    CreateBarangBuktiByTsk,
    CreateTersangkaSerializer,
    BerkasLknListApi,
    PenangkapanEditApi,
    ProsesTersangkaApi,
    StatusTersangkaApi,
    StatusBarangBuktiApi,
    StatusModerator1,
    StatusModerator2,
    StatusModerator3,
    StatusBBwithAproval

    )
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, filters
from django.views.generic import TemplateView
from django_filters.widgets import RangeWidget
from django_filters.filters import RangeFilter
from django_filters.fields import RangeField
from django.shortcuts import render
from django import forms


class DateRangeCustomWidget(RangeWidget):
    suffixes = ['mulai','akhir']


class CustomRange(RangeField):
    
    widget = DateRangeCustomWidget

    def __init__(self, *args, **kwargs):
        fields = (
            forms.DateField(),
            forms.DateField())
        super().__init__(fields, *args, **kwargs)


class DateFromTo(RangeFilter):
    field_class = CustomRange

class LknDateFilter(FilterSet):
    tgl_dibuat = DateFromTo()

    class Meta:
        model = BerkasLKN
        fields = [
            
        ]
class PenangkapanDateFilter(FilterSet):
    created = DateFromTo()

    class Meta:
        model = Penangkapan
        fields = [
            
        ]
class TersangkaDateFilter(FilterSet):
    created = DateFromTo()

    class Meta:
        model = Tersangka
        fields = [
            
        ]

class BBDateFilter(FilterSet):
    created = DateFromTo()

    class Meta:
        model = BarangBukti
        fields = [
            
        ]

class BerkasLknView(viewsets.ModelViewSet):
    queryset = BerkasLKN.objects.all()
    serializer_class = BerkasLknApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'LKN','created']
    filter_class = LknDateFilter
    
    
    def get_queryset(self):
        user = self.request.user
        query_set = self.queryset
        if not user.is_superuser:
            query_set = query_set.filter(penyidik=self.request.user)
        return query_set

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
            self.serializer_class = BerkasLknListApi
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        image = request.FILES["penangkapan_tersangka.foto"]
        serializer = BerkasLKN(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PenangkapanView(viewsets.ModelViewSet):
    queryset = Penangkapan.objects.all()
    serializer_class = PenangkapanApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'no_penangkapan','no_lkn__LKN','no_lkn','created']
    parser_class = (FileUploadParser,)
    filter_class = PenangkapanDateFilter

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
            self.serializer_class = PenangkapanEditApi
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
    parser_class = (FileUploadParser,)
    


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

class ProsesTersangkaView(viewsets.ModelViewSet):
    queryset = ProsesTersangka.objects.all()
    serializer_class = ProsesTersangkaApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['proses_tersangka__no_penangkapan_id__no_penangkapan','proses_tersangka']
    parser_class = (FormParser, MultiPartParser)



    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        queryset = ProsesTersangka.objects.all()
        if not user.is_superuser:
            queryset = ProsesTersangka.objects.filter(
                proses_tersangka__no_penangkapan_id__no_lkn__penyidik=self.request.user.id)
        return queryset

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [AllowAny]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        serializer = ProsesTersangkaApi(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            instance = ProsesTersangka.objects.get(pk=kwargs['pk'])
            serializer = ProsesTersangkaApi(instance=instance,data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                success = Response(serializer.data,status=status.HTTP_200_OK)
                print(success.data)
                return success
            error = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(error.data)
            return error
        except ProsesTersangka.DoesNotExist:
            serializer = ProsesTersangkaApi(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class StatusTersangkaView(viewsets.ModelViewSet):
    queryset = StatusTersangka.objects.all()
    serializer_class = StatusTersangkaApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tersangka_id__no_penangkapan_id','tersangka_id']
    parser_class = (FormParser, MultiPartParser)



    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        queryset = StatusTersangka.objects.all()
        if not user.is_superuser:
            queryset = StatusTersangka.objects.filter(
                tersangka_id__no_penangkapan_id__no_lkn__penyidik=self.request.user.id)
        return queryset

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [AllowAny]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        serializer = StatusTersangkaApi(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            instance = StatusTersangka.objects.get(pk=kwargs['pk'])
            serializer = StatusTersangkaApi(instance=instance,data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                success = Response(serializer.data,status=status.HTTP_200_OK)
                print(success.data)
                return success
            error = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(error.data)
            return error
        except StatusTersangka.DoesNotExist:
            serializer = StatusTersangkaApi(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TersangkaEditDetailView(viewsets.ModelViewSet):
    queryset = Tersangka.objects.all()
    serializer_class = TersangkaEditApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['no_penangkapan_id__id']
    parser_class = (FormParser, MultiPartParser)
    filter_class = TersangkaDateFilter



    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        queryset = Tersangka.objects.all()
        if not user.is_superuser:
            queryset = Tersangka.objects.filter(
                no_penangkapan_id__no_lkn__penyidik=self.request.user.id)
        return queryset

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            self.serializer_class = CreateTersangkaSerializer
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [AllowAny]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def post(self, request, format=None):
        serializer = CreateTersangkaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            instance = Tersangka.objects.get(pk=kwargs['pk'])
            serializer = TersangkaEditApi(instance=instance,data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                success = Response(serializer.data,status=status.HTTP_200_OK)
                print(success.data)
                return success
            error = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(error.data)
            return error
        except Tersangka.DoesNotExist:
            serializer = TersangkaEditApi(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BarangBuktiEditView(viewsets.ModelViewSet):
    queryset = BarangBukti.objects.all()
    serializer_class = BarangBuktiEdit
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['milik_tersangka_id__no_penangkapan_id__id']
    filter_class = BBDateFilter
    
    
    
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
            self.serializer_class = CreateBarangBuktiByTsk
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [AllowAny]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def update(self, request, *args, **kwargs):
        try:
            instance = BarangBukti.objects.get(pk=kwargs['pk'])
            serializer = BarangBuktiEdit(instance=instance,data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                success = Response(serializer.data,status=status.HTTP_200_OK)
                return success
            error = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return error
        except BarangBukti.DoesNotExist:
            serializer = BarangBuktiEdit(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        serializer = CreateBarangBuktiByTsk(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StatusBarangBuktiView(viewsets.ModelViewSet):
    queryset = StatusBarangBukti.objects.all()
    serializer_class = StatusBarangBuktiApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['barang_bukti_id']
    
    
    
    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        queryset = StatusBarangBukti.objects.all()
        if not user.is_superuser:
            queryset = StatusBarangBukti.objects.filter(
                barang_bukti_id__milik_tersangka_id__no_penangkapan_id__no_lkn__penyidik=self.request.user,approve_status='APPROVE')
        else:
           queryset = StatusBarangBukti.objects.filter(approve_status='APPROVE') 
        return queryset

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [AllowAny]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def update(self, request, *args, **kwargs):
        try:
            instance = StatusBarangBukti.objects.get(pk=kwargs['pk'])
            serializer = StatusBarangBuktiApi(instance=instance,data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                success = Response(serializer.data,status=status.HTTP_200_OK)
                return success
            error = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return error
        except StatusBarangBukti.DoesNotExist:
            serializer = StatusBarangBuktiApi(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        serializer = StatusBarangBuktiApi(data=request.data)
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


class StatusBBapprovalView(viewsets.ModelViewSet):
    queryset = StatusBarangBukti.objects.all()
    serializer_class = StatusModerator1
    serializer_class_2 = StatusModerator2
    serializer_class_3 = StatusModerator3
    detail_serializer = StatusBBwithAproval
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['approve_status','moderator_one_status','moderator_two_status','moderator_three_status']


    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        queryset = StatusBarangBukti.objects.all().order_by('-created')
        if not user.is_superuser:
            queryset = StatusBarangBukti.objects.filter(
                barang_bukti_id__milik_tersangka_id__no_penangkapan_id__no_lkn__penyidik=self.request.user)
        if user.moderator == 'moderator_1':
            queryset =  queryset.filter(moderator_one_status='PENDING')
        if user.moderator == 'moderator_2':
            queryset =  queryset.filter(moderator_two_status='PENDING')
        if user.moderator == 'moderator_3':
            queryset =  queryset.filter(moderator_three_status='PENDING')
            
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

    def get_serializer_class(self):
        user = self.request.user
        if self.action == 'update' or self.action == 'partial_update':
            if user.moderator == 'moderator_1':
                return self.serializer_class
            elif user.moderator == 'moderator_2':
                return self.serializer_class_2
            elif user.moderator == 'moderator_3':
                return self.serializer_class_3
            # return super().get_serializer_class()
            
        elif self.action == 'retrieve' or self.action== 'list':
            return self.detail_serializer
        return super().get_serializer_class()





class HomeView(TemplateView):
    template_name = 'base.html'