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
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class BerkasLknApi(serializers.ModelSerializer):
    penyidik = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = BerkasLKN
        fields = ('__all__')


class PenangkapanApi(serializers.ModelSerializer):

    class Meta:
        model = Penangkapan
        fields = ('id', 'no_lkn', 'no_penangkapan',
                  'tanggal_penangkapan', 'jam_penangkapan')


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
