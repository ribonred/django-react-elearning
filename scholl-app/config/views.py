from django.views.generic import TemplateView
from datetime import datetime
from django.shortcuts import render,HttpResponse
# Django Channels
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from backendmodel.notify.models import tempModel
import requests
TELEGRAM_TOKEN='1022252024:AAH4MQrGhXvk6cI5v1KD5DsbHOqmxqErJWk'


def telegram_bot_sendtext(bot_message,bot_chatID):
    
    send_text = 'https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/sendMessage?chat_id=' + bot_chatID + '&parse_mode=Markdown&text=' + bot_message

    response = requests.get(send_text)
    _resp=response.json()
    if _resp['ok']:
        return print('connected')
    else:
        return print('we cant recognize your id')
class indexview(TemplateView):
    template_name = 'home.html'

@csrf_exempt
def get_loc(request):
    lat = request.POST.get('lat',None)
    lng = request.POST.get('lng',None)
    obj = tempModel.objects.create(lat=lat,lng=lng)
    message = f'https://maps.google.com/?q={lat},{lng}'
    telegram_bot_sendtext(message,'721912134')
    obj.save()
    return JsonResponse({'status':'ok'})

def notification_test_page(receiver,msg):

    # Django Channels Notifications Test
    channel_layer = get_channel_layer()
    data = {
        'name':receiver.email,
        'message':msg
    }
    # Trigger message sent to group
    async_to_sync(channel_layer.group_send)(
        str("group"),  # Channel Name, Should always be string
        {
            "type": "notify",   # Custom Function written in the consumers.py
            "text": data,
        },
    )
    return HttpResponse('ok')