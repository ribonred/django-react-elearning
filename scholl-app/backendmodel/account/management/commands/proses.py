from backendmodel.organizations.models import ProsesPengadilan
from django.core.management.base import BaseCommand, CommandError



class Command(BaseCommand):


    def handle(self, *args, **options):
        try:
            jenis_proses = ['PENYIDIK','PENGADILAN 1','PENGADILAN 2','KEJATI']
            proses =  ProsesPengadilan.objects.count()
            if proses < 1:
                for name in jenis_proses:
                    ProsesPengadilan.objects.create(nama_proses=name)
                print('proses created')
        except Exception as e:
            print(e)
