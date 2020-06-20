from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync
import string
import random

def generateRandomGroup(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

class NotificationConsumer(WebsocketConsumer):
    
    # Function to connect to the websocket
    def connect(self):
       # Checking if the User is logged in
    #    group = generateRandomGroup()
        # if self.scope["user"].is_anonymous:
            # # print(self.scope["user"])   # Can access logged in user details by using self.scope.user, Can only be used if AuthMiddlewareStack is used in the routing.py
        self.group_name = 'group'  # Setting the group name as the pk of the user primary key as it is unique to each user. The group name is used to communicate with the user.
        async_to_sync(self.channel_layer.group_add)(self.group_name, self.channel_name)
        self.accept()

    # Function to disconnet the Socket
    def disconnect(self, close_code):
        self.close()
        # pass

    # Custom Notify Function which can be called from Views or api to send message to the frontend
    def notify(self, event):
        self.send(text_data=json.dumps(event["text"]))