from .utils import ModelViewsetPaginate, StandardResultsSetPagination
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
from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from django.views.generic import TemplateView
from django_filters.widgets import RangeWidget
from django_filters.filters import RangeFilter, CharFilter
from django_filters.fields import RangeField
from django.shortcuts import render
from django import forms
import django_filters


class DateRangeCustomWidget(RangeWidget):
    suffixes = ['mulai', 'akhir']


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
    LKN = CharFilter(lookup_expr='startswith')

    class Meta:
        model = BerkasLKN
        fields = {
            'LKN'
        }


class PenangkapanDateFilter(FilterSet):
    created = DateFromTo()
    no_penangkapan = CharFilter(lookup_expr='startswith')

    class Meta:
        model = Penangkapan
        fields = [
            'id', 'no_penangkapan', 'no_lkn__LKN', 'no_lkn', 'created'
        ]


class TersangkaDateFilter(FilterSet):
    created = DateFromTo()
    nama_tersangka = CharFilter(lookup_expr='startswith')

    class Meta:
        model = Tersangka
        fields = [
            'no_penangkapan_id__id'
        ]


class BBDateFilter(FilterSet):
    created = DateFromTo()
    sp_sita = CharFilter(lookup_expr='startswith')

    class Meta:
        model = BarangBukti
        fields = [
            'milik_tersangka_id__no_penangkapan_id__id',
            'sp_sita'
        ]


class BerkasLknView(ModelViewsetPaginate):
    queryset = BerkasLKN.objects.all()
    serializer_class = BerkasLknApi
    # filterset_fields = ['id', 'LKN', 'created']
    filter_class = LknDateFilter
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user = self.request.user
        query_set = self.queryset.order_by('tgl_dibuat')
        if not user.is_superuser:
            query_set = query_set.filter(
                penyidik=self.request.user).order_by('tgl_dibuat')
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


class PenangkapanView(ModelViewsetPaginate):
    queryset = Penangkapan.objects.all()
    serializer_class = PenangkapanApi
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['id', 'no_penangkapan','no_lkn__LKN','no_lkn','created']
    parser_class = (FileUploadParser, MultiPartParser, FormParser)
    filter_class = PenangkapanDateFilter
    pagination_class = StandardResultsSetPagination

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
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("tese")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TersangkaView(ModelViewsetPaginate):
    queryset = Tersangka.objects.all()
    serializer_class = TersangkaApi
    parser_class = (FileUploadParser,)
    pagination_class = StandardResultsSetPagination
    search_fields = ['^nama_tersangka']
    filter_backends = [filters.SearchFilter]

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


class ProsesTersangkaView(ModelViewsetPaginate):
    queryset = ProsesTersangka.objects.all()
    serializer_class = ProsesTersangkaApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'proses_tersangka__no_penangkapan_id__no_penangkapan', 'proses_tersangka']
    parser_class = (FormParser, MultiPartParser)
    pagination_class = StandardResultsSetPagination

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
            serializer = ProsesTersangkaApi(
                instance=instance, data=request.data)
            # files = request.FILES["tap_sita_doc"]
            # print(files)

            if serializer.is_valid():
                serializer.save()
                success = Response(serializer.data, status=status.HTTP_200_OK)
                print(success.data)
                return success
            error = Response(serializer.errors,
                             status=status.HTTP_400_BAD_REQUEST)
            print(error.data)
            return error
        except ProsesTersangka.DoesNotExist:
            serializer = ProsesTersangkaApi(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StatusTersangkaView(ModelViewsetPaginate):
    queryset = StatusTersangka.objects.all()
    serializer_class = StatusTersangkaApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tersangka_id__no_penangkapan_id', 'tersangka_id']
    parser_class = (FormParser, MultiPartParser)
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.order_by('created')
        queryset = StatusTersangka.objects.all().order_by('created')
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
            serializer = StatusTersangkaApi(
                instance=instance, data=request.data)

            if serializer.is_valid():
                serializer.save()
                success = Response(serializer.data, status=status.HTTP_200_OK)
                print(success.data)
                return success
            error = Response(serializer.errors,
                             status=status.HTTP_400_BAD_REQUEST)
            print(error.data)
            return error
        except StatusTersangka.DoesNotExist:
            serializer = StatusTersangkaApi(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TersangkaEditDetailView(ModelViewsetPaginate):
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
            serializer = TersangkaEditApi(instance=instance, data=request.data)

            if serializer.is_valid():
                serializer.save()
                success = Response(serializer.data, status=status.HTTP_200_OK)
                print(success.data)
                return success
            error = Response(serializer.errors,
                             status=status.HTTP_400_BAD_REQUEST)
            print(error.data)
            return error
        except Tersangka.DoesNotExist:
            serializer = TersangkaEditApi(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BarangBuktiEditView(ModelViewsetPaginate):
    queryset = BarangBukti.objects.all()
    serializer_class = BarangBuktiEdit
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['milik_tersangka_id__no_penangkapan_id__id']
    filter_class = BBDateFilter
    parser_class = (FileUploadParser, MultiPartParser, FormParser)

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
        elif self.action == 'update' or self.action == 'partial_update':
            self.serializer_class = CreateBarangBuktiByTsk
            permission_classes = [AllowAny]
        elif self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def update(self, request, *args, **kwargs):
        try:
            instance = BarangBukti.objects.get(pk=kwargs['pk'])
            serializer = BarangBuktiEdit(instance=instance, data=request.data)

            if serializer.is_valid():
                serializer.save()
                print(serializer.data)
                success = Response(serializer.data, status=status.HTTP_200_OK)
                return success
            error = Response(serializer.errors,
                             status=status.HTTP_400_BAD_REQUEST)
            print(serializer.errors)
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


class StatusBarangBuktiView(ModelViewsetPaginate):
    queryset = StatusBarangBukti.objects.all()
    serializer_class = StatusBarangBuktiApi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['barang_bukti_id']
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user = self.request.user
        queryset = StatusBarangBukti.objects.all().order_by('created')
        if not user.is_superuser:
            queryset = StatusBarangBukti.objects.filter(
                barang_bukti_id__milik_tersangka_id__no_penangkapan_id__no_lkn__penyidik=self.request.user, approve_status='APPROVE').order_by('created')
        else:
            queryset = StatusBarangBukti.objects.filter(
                approve_status='APPROVE')
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
            serializer = StatusBarangBuktiApi(
                instance=instance, data=request.data)

            if serializer.is_valid():
                serializer.save()
                success = Response(serializer.data, status=status.HTTP_200_OK)
                return success
            error = Response(serializer.errors,
                             status=status.HTTP_400_BAD_REQUEST)
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


class LknDetailApiView(ModelViewsetPaginate):
    queryset = BerkasLKN.objects.all()
    serializer_class = LknDetailAPi
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'LKN']
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = self.queryset.order_by('created')
        user = self.request.user
        if not user.is_superuser:
            queryset = queryset.filter(
                penyidik=self.request.user).order_by('created')
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


class StatusBBapprovalView(ModelViewsetPaginate):
    queryset = StatusBarangBukti.objects.all()
    serializer_class = StatusModerator1
    serializer_class_2 = StatusModerator2
    serializer_class_3 = StatusModerator3
    detail_serializer = StatusBBwithAproval
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['approve_status', 'moderator_one_status',
                        'moderator_two_status', 'moderator_three_status']
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        queryset = StatusBarangBukti.objects.all().order_by('-created')
        if not user.is_superuser:
            queryset = StatusBarangBukti.objects.filter(
                barang_bukti_id__milik_tersangka_id__no_penangkapan_id__no_lkn__penyidik=self.request.user).order_by('created')
        if user.moderator == 'moderator_1':
            queryset = queryset.filter(moderator_one_status='PENDING')
        if user.moderator == 'moderator_2':
            queryset = queryset.filter(moderator_two_status='PENDING')
        if user.moderator == 'moderator_3':
            queryset = queryset.filter(moderator_three_status='PENDING')

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

        elif self.action == 'retrieve' or self.action == 'list':
            return self.detail_serializer
        return super().get_serializer_class()


class HomeView(TemplateView):
    template_name = 'base.html'
