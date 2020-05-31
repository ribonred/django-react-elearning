from django.apps import AppConfig


class OrganizationsConfig(AppConfig):
    name = 'backendmodel.organizations'

    def ready(self): #method just to import the signals
    	import backendmodel.organizations.signal