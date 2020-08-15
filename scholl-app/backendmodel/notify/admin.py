from django.contrib import admin
from .models import NotificationsLkn
class notifadmin(admin.ModelAdmin):
    readonly_fields=('topic_fcm',)
admin.site.register(NotificationsLkn,notifadmin)