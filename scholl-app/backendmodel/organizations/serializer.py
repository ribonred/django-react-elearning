from backendmodel.core.models import User
from rest_framework.fields import CurrentUserDefault
from rest_framework import serializers
from rest_framework import status
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
from drf_writable_nested.serializers import WritableNestedModelSerializer
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class BerkasLknApi(serializers.ModelSerializer):
    penyidik = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = BerkasLKN
        fields = ('__all__')


class StatusBarangBuktiApi(serializers.ModelSerializer):
    class Meta:
        model = StatusBarangBukti
        fields = ['id', 'tanggal_status', 'waktu_status',
                  'jumlah', 'keterangan', 'status']


class BarangBuktiApi(WritableNestedModelSerializer):
    statusbarangbukti = StatusBarangBuktiApi(
        many=True, required=False, allow_null=True)

    class Meta:
        model = BarangBukti
        fields = ['id', 'milik_tersangka_id', 'nama_barang',
                  'sp_sita', 'tap_status', 'jenis_barang', 'statusbarangbukti']


class ProsesPengadilanApi(serializers.ModelSerializer):
    class Meta:
        model = ProsesPengadilan
        fields = ('__all__')


class ProsesTersangkaApi(serializers.ModelSerializer):
    jenis_proses = serializers.PrimaryKeyRelatedField(
        queryset=ProsesPengadilan.objects.all())

    class Meta:
        model = ProsesTersangka
        fields = ['id', 'proses_tersangka', 'no_proses',
                  'jenis_proses', 'keterangan']


class StatusTersangkaApi(serializers.ModelSerializer):
    class Meta:
        model = StatusTersangka
        fields = ('__all__')


class TersangkaApi(WritableNestedModelSerializer):
    statustersangka = StatusTersangkaApi(
        many=True, required=False, allow_null=True)
    barangbuktitersangka = BarangBuktiApi(
        many=True, required=False, allow_null=True)

    class Meta:
        model = Tersangka
        fields = ['id', 'nama_tersangka', 'umur', 'jenis_kelamin',
                  'foto', 'statustersangka', 'barangbuktitersangka']


class PenangkapanApi(WritableNestedModelSerializer):
    penangkapan_tersangka = TersangkaApi(
        many=True, required=False, allow_null=True)

    class Meta:
        model = Penangkapan
        fields = ('id', 'no_lkn', 'no_penangkapan',
                  'tanggal_penangkapan', 'jam_penangkapan', 'penangkapan_tersangka')


class TersangkaEditApi(WritableNestedModelSerializer):
    statustersangka = StatusTersangkaApi(
        many=True, required=False, allow_null=True)
    prosestersangka = ProsesTersangkaApi(
        many=True, required=False, allow_null=True)

    class Meta:
        model = Tersangka
        fields = ['id',  'nama_tersangka', 'umur', 'jenis_kelamin',
                  'foto', 'no_penangkapan_id', 'statustersangka', 'prosestersangka']
        depth = 2
