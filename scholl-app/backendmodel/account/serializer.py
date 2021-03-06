from backendmodel.core.models import User
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class ApiUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'nama_depan', 'nama_belakang', 'profile_pic', 'email', 'password', 'phone',
                  'jenis_kelamin', 'tanggal_lahir', 'address', 'role','moderator')
    
    
    # def update(self, instance, validated_data):
    #     instance.set_password(validated_data['password'])
    #     instance.save()
    #     return instance


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')


class UserRegistrations(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.is_active = True
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'id', 'username', 'nama_depan', 'nama_belakang', 'email', 'password', 'phone',
                  'jenis_kelamin', 'tanggal_lahir', 'address', 'role')
