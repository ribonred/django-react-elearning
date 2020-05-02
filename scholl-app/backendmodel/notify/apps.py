from django.apps import AppConfig


class NotifyConfig(AppConfig):
    name = 'backendmodel.notify'
    
    
    def ready(self): #method just to import the signals
    	import backendmodel.notify.signal