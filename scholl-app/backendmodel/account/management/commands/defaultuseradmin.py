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
                    password=pwd,
                    role=2)
                user.objects.create_superuser( 
                    username="moderator1",
                    email="moderator1@localhost.com",
                    nama_depan="moderator",
                    nama_belakang="user 1",
                    password=pwd,
                    role=2,
                    moderator='moderator_1')
                user.objects.create_superuser( 
                    username="moderator2",
                    email="moderator2@localhost.com",
                    nama_depan="moderator",
                    nama_belakang="user 2",
                    password=pwd,
                    role=2,
                    moderator='moderator_2')
                user.objects.create_superuser( 
                    username="moderator3",
                    email="moderator3@localhost.com",
                    nama_depan="moderator",
                    nama_belakang="user 3",
                    password=pwd,
                    role=2,
                    moderator='moderator_3')
                print('admin user created')
        except Exception as e:
            print(e)
