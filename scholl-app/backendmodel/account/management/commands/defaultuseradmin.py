from backendmodel.core.models import User
from django.core.management.base import BaseCommand, CommandError



class Command(BaseCommand):


    def handle(self, *args, **options):
        try:
            user_count =  User.objects.count()
            if user_count < 1:
                user = User
                pwd = "admin"
                user.objects.create_superuser( 
                    username="admin",
                    email="admin@localhost.com",
                    nama_depan="seorang",
                    nama_belakang="admin",
                    password=pwd)
                print('admin user created')
        except Exception as e:
            print(e)
