from rest_framework import serializers, generics
from backendmodel.core.models import User
from .models import NotificationsLkn
from .serializers import notifserializer
from rest_framework.permissions import IsAuthenticated


class ActivityView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = notifserializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user =self.request.user
        user_instance = User.objects.get(id=user.id)
        queryset = user_instance.notifuser.filter(status_read=False)
        return queryset
    

