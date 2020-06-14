from django.views.generic import TemplateView
from datetime import datetime
from django.shortcuts import render,HttpResponse
# Django Channels
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse


class indexview(TemplateView):
    template_name = 'home.html'





def notification_test_page(receiver,msg):

    # Django Channels Notifications Test
    channel_layer = get_channel_layer()
    data = {
        'name':receiver.email,
        'message':msg
    }
    # Trigger message sent to group
    async_to_sync(channel_layer.group_send)(
        str("tes"),  # Channel Name, Should always be string
        {
            "type": "notify",   # Custom Function written in the consumers.py
            "text": data,
        },
    )
    return HttpResponse('ok')