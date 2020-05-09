from backendmodel.core.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from config.views import notification_test_page
from .models import NotificationsLkn
from backendmodel.organizations.models import BerkasLKN


@receiver(post_save,sender=BerkasLKN)
def getNotifCreated(sender, instance, created,**kwargs):
    # if created:
    try:
        user = User.objects.filter(role=2)
        if user:
            time = instance.created.strftime('%Y-%m-%d')
            time_hour = instance.created.strftime('%H:%M')
            message = f'penyidik {instance.penyidik.nama_depan} {instance.penyidik.nama_belakang} menambahkan LKN nomor {instance.LKN} pada {time} pukul {time_hour}'
            if len(user) > 1:
                for users in user:
                    print(users.pk)
                    NotificationsLkn.objects.create(receiver=users.pk, message=message)
            else:
                NotificationsLkn.objects.create(receiver=user.pk, message=message)

    except Exception as e:
        print(e)



@receiver(post_save, sender=NotificationsLkn)
def send_notif(sender, instance,created, **kwargs):
    user = instance.receiver
    msg = instance.message
    notification_test_page(user,msg)