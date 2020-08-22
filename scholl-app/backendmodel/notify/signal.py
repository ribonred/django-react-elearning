from backendmodel.core.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from config.views import notification_test_page
from .models import NotificationsLkn
from backendmodel.organizations.models import BerkasLKN,StatusBarangBukti
from push_notifications.gcm import send_message
from datetime import datetime

@receiver(post_save,sender=StatusBarangBukti)
def getNotifStatus(sender, instance,created,**kwargs):
    if created:
        user = User.objects.filter(role=2)
        if user:
            time = instance.created.strftime('%Y-%m-%d')
            time_hour = datetime.now().strftime('%H:%M')
            message = f'penyidik {instance.barang_bukti_id.milik_tersangka_id.no_penangkapan_id.no_lkn.penyidik.nama_depan} \
                {instance.barang_bukti_id.milik_tersangka_id.no_penangkapan_id.no_lkn.penyidik.nama_belakang} \
                melakukan pengajuan status barang bukti {instance.barang_bukti_id.nama_barang} \
                milik tersangka {instance.barang_bukti_id.milik_tersangka_id.nama_tersangka} \
                no penangkapan{instance.barang_bukti_id.milik_tersangka_id.no_penangkapan_id.no_penangkapan} pada {time} pukul {time_hour}'
            if len(user) > 1:
                notif = NotificationsLkn.objects.create(sender=instance.barang_bukti_id.milik_tersangka_id.no_penangkapan_id.no_lkn.penyidik, message=message)
                for users in user:
                    notif.receiver.add(users)
    else:
        pass

@receiver(post_save,sender=BerkasLKN)
def getNotifCreated(sender, instance, created,**kwargs):
    # if created:
    try:
        user = User.objects.filter(role=2)
        if user:
            time = instance.created.strftime('%Y-%m-%d')
            time_hour = datetime.now().strftime('%H:%M')
            print(time_hour)
            message = f'penyidik {instance.penyidik.nama_depan} {instance.penyidik.nama_belakang} menambahkan LKN nomor {instance.LKN} pada {time} pukul {time_hour}'
            if len(user) > 1:
                notif = NotificationsLkn.objects.create(sender=instance.penyidik, message=message)
                for users in user:
                    notif.receiver.add(users)
                    

    except Exception as e:
        print(e)



@receiver(post_save, sender=NotificationsLkn)
def send_notif(sender, instance,created, **kwargs):
    msg = instance.message
    if created:
        send_message(
            None, {
                "title":"Pembaharuan Data",
                "body": msg
                },
                to=instance.topic_fcm,
                cloud_type='FCM'
        )
    # notification_test_page(user,msg)