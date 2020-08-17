from django.db import models
from backendmodel.core.models import User
from datetime import datetime
from push_notifications.gcm import send_message

class NotificationsLkn(models.Model):
    sender = models.ForeignKey(User,on_delete=models.CASCADE,related_name='sender_user')
    receiver = models.ManyToManyField(User,  related_name='notifuser', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=150,null=True, blank=True)
    status_read =models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)
    topic_fcm = models.CharField(max_length=255,null=True, blank=True)


    def save(self, *args, **kwargs):
        if not self.created:
            self.created = datetime.now()
        if self.sender.role == 2:
            self.topic_fcm = '/topics/regular'
        else:
            self.topic_fcm = '/topics/moderator'
        super(NotificationsLkn, self).save(*args, **kwargs)

    def __str__(self):
        return self.sender.username



