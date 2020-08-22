from rest_framework import serializers,viewsets,status
from backendmodel.core.models import User
from .models import NotificationsLkn
from .serializers import notifserializer
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
from .utils import ModelViewsetPaginate, StandardResultsSetPagination


class ActivityView(ModelViewsetPaginate):
    queryset = User.objects.all()
    serializer_class = notifserializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user =self.request.user
        user_instance = User.objects.get(id=user.id)
        queryset = user_instance.notifuser.filter(status_read=False).order_by('created')
        return queryset
    
    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAdminUser]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAdminUser]
        elif self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    @action(detail=True,methods=['get'])
    def readnotif(self,request,pk=None):
        user =self.request.user
        try:
            notif = NotificationsLkn.objects.get(pk=pk)
        except NotificationsLkn.DoesNotExist:
            return Response({'error':'error'},status.HTTP_400_BAD_REQUEST)
        notif.receiver.remove(user)
        return Response({'status':'success'},status.HTTP_200_OK)
            
                
    

