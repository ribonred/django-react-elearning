from rest_framework import serializers
from .models import NotificationsLkn


class notifserializer(serializers.ModelSerializer):

    class Meta:
        model = NotificationsLkn
        fields =('__all__',)