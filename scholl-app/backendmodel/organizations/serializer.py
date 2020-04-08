from backendmodel.core.models import User
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from .models import Company, CompanyDivision
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('__all__')


class CompanyDivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDivision
        fields = ('__all__')
