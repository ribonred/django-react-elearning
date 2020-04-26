from django.db import models
from backendmodel.core.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from config.views import notification_test_page



class NotificationsLkn(models.Model):
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifuser')
    created = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=150,null=True, blank=True)
    status_read =models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.receiver.username



@receiver(post_save, sender=NotificationsLkn)
def send_notif(sender, instance,created, **kwargs):
    if created:
        user = instance.receiver
        msg = instance.message
        notification_test_page(user,msg)