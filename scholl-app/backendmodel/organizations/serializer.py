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



class BerkasLknListApi(serializers.ModelSerializer):
    class Meta:
        model = BerkasLKN
        fields = ('__all__')
        read_only_fields =['created','updated']
        depth = 1


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
        fields = ['id','barang_bukti_id', 'tanggal_status', 'waktu_status',
                  'jumlah','satuan', 'keterangan', 'status']


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
        fields = [
            'id',
            'proses_tersangka',
            'tanggal_mulai_proses',
            'tanggal_akhir_proses',
            'sp_han',
            'sp_han_doc',
            'tap_han',
            'tap_han_doc',
            'surat_perpanjangan_han',
            'surat_perpanjangan_han_doc',
            'jenis_proses',
            'keterangan']
        


class StatusTersangkaApi(WritableNestedModelSerializer):
    class Meta:
        model = StatusTersangka
        fields = [
            "id",
            "status_penahanan",
            "rekam_jejak",
            "tanggal",
            "waktu",
            "keterangan",
            "tersangka_id"]


class TersangkaApi(WritableNestedModelSerializer):
    statustersangka = StatusTersangkaApi(
        many=True, required=False, allow_null=True)
    barangbuktitersangka = BarangBuktiApi(
        many=True, required=False, allow_null=True)

    class Meta:
        model = Tersangka
        fields = ['id', 'no_penangkapan_id', 'nama_tersangka', 'umur', 'jenis_kelamin',
                  'foto', 'statustersangka', 'barangbuktitersangka']

class PenangkapanEditApi(serializers.ModelSerializer):
    

    class Meta:
        model = Penangkapan
        fields = ('id','no_penangkapan',
                  'tanggal_penangkapan', 'masa_berakhir_penangkapan','dokumen_penangkapan',
                  'sp_jangkap','tanggal_sp_jangkap','masa_berakhir_sp_jangkap','dokumen_sp_jangkap')


class PenangkapanApi(WritableNestedModelSerializer):
    penangkapan_tersangka = TersangkaApi(
        many=True, required=False, allow_null=True)

    class Meta:
        model = Penangkapan
        fields = ('id', 'no_lkn', 'no_penangkapan',
                  'tanggal_penangkapan', 'masa_berakhir_penangkapan', 'penangkapan_tersangka',
                  'dokumen_penangkapan',
                  'sp_jangkap','tanggal_sp_jangkap','masa_berakhir_sp_jangkap','dokumen_sp_jangkap')


class TersangkaEditApi(WritableNestedModelSerializer):

    class Meta:
        model = Tersangka
        fields = ['id',  'nama_tersangka', 'umur', 'jenis_kelamin',
                  'foto','no_penangkapan_id']
        depth = 2


class BarangBuktiEdit(WritableNestedModelSerializer):
    # statusbarangbukti = StatusBarangBuktiApi(
    #     many=True, required=False, allow_null=True)

    class Meta:
        model = BarangBukti
        fields = ['id','milik_tersangka_id' ,'nama_barang',
                  'sp_sita','sp_sita_doc','tap_sita','tap_sita_doc', 'tap_status','tap_status_doc','nomor_lab','nomor_lab_doc', 'jenis_barang']

        depth = 3

###DETAIL###


class CreateTersangkaSerializer(WritableNestedModelSerializer):

    class Meta:
        model = Tersangka
        fields = ['id','no_penangkapan_id',  'nama_tersangka', 'umur', 'jenis_kelamin',
                  'foto']


class CreateBarangBuktiByTsk(WritableNestedModelSerializer):
    
    class Meta:
        model = BarangBukti
        fields = ['id','milik_tersangka_id' ,'nama_barang',
                  'sp_sita','sp_sita_doc','tap_sita','tap_sita_doc', 'tap_status','tap_status_doc','nomor_lab','nomor_lab_doc', 'jenis_barang']

class BarangBuktiDetailApi(WritableNestedModelSerializer):
    statusbarangbukti = StatusBarangBuktiApi(
        many=True, required=False, allow_null=True)

    class Meta:
        model = BarangBukti
        fields = ['id', 'nama_barang',
                  'sp_sita', 'tap_status', 'jenis_barang', 'statusbarangbukti']


class TersangkaDetailApi(WritableNestedModelSerializer):
    statustersangka = StatusTersangkaApi(
        many=True, required=False, allow_null=True)
    prosestersangka = ProsesTersangkaApi(
        many=True, required=False, allow_null=True)
    barangbuktitersangka = BarangBuktiDetailApi(
        many=True, required=False, allow_null=True)

    class Meta:
        model = Tersangka
        fields = ['id',  'nama_tersangka', 'umur', 'jenis_kelamin',
                  'foto', 'statustersangka', 'prosestersangka', 'barangbuktitersangka']


class PenangkapanApiDetail(WritableNestedModelSerializer):
    penangkapan_tersangka = TersangkaDetailApi(many=True)

    class Meta:
        model = Penangkapan
        fields = ('id', 'no_penangkapan',
                  'tanggal_penangkapan', 'masa_berakhir_penangkapan', 'penangkapan_tersangka',)


class LknDetailAPi(WritableNestedModelSerializer):
    penangkapan = PenangkapanApiDetail(
        many=True, required=False, allow_null=True)

    class Meta:
        model = BerkasLKN
        fields = ['id', 'LKN',
                  'penyidik', 'tgl_dibuat', 'penangkapan']

class StatusModerator1(serializers.ModelSerializer):
    moderator = serializers.HiddenField(default=serializers.CurrentUserDefault(),source='moderator_one',write_only=True)
    status_mod = serializers.CharField(source='moderator_one_status',write_only=True)

    class Meta:
        model = StatusBarangBukti
        fields = ['id','status','approve_status','moderator','status_mod','created']
        read_only_fields = ('id','status','approve_status','created')

class StatusModerator2(serializers.ModelSerializer):
    moderator = serializers.HiddenField(default=serializers.CurrentUserDefault(),source='moderator_two',write_only=True)
    status_mod = serializers.CharField(source='moderator_two_status',write_only=True)

    class Meta:
        model = StatusBarangBukti
        fields = ['id','status','approve_status','moderator','status_mod','created']
        read_only_fields = ('id','status','approve_status','created')

class StatusModerator3(serializers.ModelSerializer):
    moderator = serializers.HiddenField(default=serializers.CurrentUserDefault(),source='moderator_three',write_only=True)
    status_mod = serializers.CharField(source='moderator_three_status',write_only=True)

    class Meta:
        model = StatusBarangBukti
        fields = ['id','status','approve_status','moderator','status_mod','created']
        read_only_fields = ('id','status','approve_status','created')


class StatusBBwithAproval(serializers.ModelSerializer):
    barang_bukti = serializers.CharField(source='barang_bukti_id.nama_barang')
    tersangka = serializers.CharField(source='barang_bukti_id.milik_tersangka_id.nama_tersangka')
    penangkapan = serializers.CharField(source='barang_bukti_id.milik_tersangka_id.no_penangkapan_id.no_penangkapan')
    LKN = serializers.CharField(source='barang_bukti_id.milik_tersangka_id.no_penangkapan_id.no_lkn.LKN')
    admin = serializers.CharField(source='barang_bukti_id.milik_tersangka_id.no_penangkapan_id.no_lkn.penyidik.fullname')


    class Meta:
        model = StatusBarangBukti
        fields = ['id','admin','LKN','penangkapan','tersangka','barang_bukti', 'tanggal_status', 'waktu_status',
                  'jumlah','satuan', 'keterangan', 'status','approve_status','moderator_one',
        'moderator_one_status', 'moderator_two',
        'moderator_two_status','moderator_three',
        'moderator_three_status','created']
        read_only_fields = ('id','admin','LKN','penangkapan','tersangka','barang_bukti', 'tanggal_status', 'waktu_status',
                  'jumlah','satuan', 'keterangan', 'status','approve_status','moderator_one',
        'moderator_one_status', 'moderator_two',
        'moderator_two_status','moderator_three',
        'moderator_three_status','created')

