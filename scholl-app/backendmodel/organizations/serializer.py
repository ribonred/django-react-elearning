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

    # def created(self, validated_data):
    #     statuses = validated_data.pop['statusbarangbukti']
    #     bb_created = BarangBukti.objects.all()
    #     print(bb_created)
    #     StatusBarangBuktiApi.objects.create(
    #         barang_bukti_id=bb_created.id, **statuses)
    #     return bb_created


class ProsesTersangkaApi(serializers.ModelSerializer):
    class Meta:
        model = ProsesTersangka
        fields = ('__all__')


class ProsesPengadilanApi(serializers.ModelSerializer):
    class Meta:
        model = ProsesPengadilan
        fields = ('__all__')


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
        fields = ['id', 'no_penangkapan_id', 'nama_tersangka', 'umur', 'jenis_kelamin',
                  'foto', 'statustersangka', 'barangbuktitersangka']

    # def create(self, validated_data):
    #     _status_tersangka = validated_data.pop('statustersangka')
    #     _bb = validated_data.pop('barangbuktitersangka')
    #     tersangka = Tersangka.objects.create(**validated_data)
    #     for st in _status_tersangka:
    #         StatusTersangka.objects.create(
    #             tersangka_id=tersangka, **st)
    #     for bb in _bb:
    #         bb_create = BarangBukti.objects.create(
    #             milik_tersangka_id=tersangka, **bb)

    #     return tersangka


class PenangkapanApi(WritableNestedModelSerializer):
    penangkapan_tersangka = TersangkaApi(
        many=True, required=False, allow_null=True)

    class Meta:
        model = Penangkapan
        fields = ('id', 'no_lkn', 'no_penangkapan',
                  'tanggal_penangkapan', 'jam_penangkapan', 'penangkapan_tersangka')


# class CompanyDivisionMemberSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DivisionMember
#         fields = ('__all__')


# class CompanyDivisionSerializer(serializers.ModelSerializer):
#     company_member_division = CompanyDivisionMemberSerializer(many=True)

#     class Meta:
#         model = CompanyDivision
#         fields = ['id', 'division_name',
#                   'company_member_division', 'company_division']


# class CompanySerializerAll(serializers.ModelSerializer):
#     division = CompanyDivisionSerializer(many=True)

#     class Meta:
#         model = Company
#         fields = ['id', 'company_manager', 'company_name',
#                   'company_address', 'company_code', 'division']
