from django.db import models
from backendmodel.core.models import User


class NotificationsLkn(models.Model):
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifuser')
    created = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=150,null=True, blank=True)
    status_read =models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.created