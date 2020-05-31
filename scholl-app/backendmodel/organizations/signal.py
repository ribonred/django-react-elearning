from backendmodel.core.models import User
from django.db.models.signals import post_save,pre_save
from .models import StatusBarangBukti
from django.dispatch import receiver


@receiver(post_save,sender=StatusBarangBukti)
def ApproveStatus(sender, instance,**kwargs):
    if instance.moderator_one_status == 'APPROVE' and instance.moderator_two_status == 'APPROVE' and instance.moderator_two_status == 'APPROVE':
        instance.approve_status = 'APPROVE'
        post_save.disconnect(ApproveStatus, sender=StatusBarangBukti)
        instance.save()
        post_save.connect(ApproveStatus, sender=StatusBarangBukti)