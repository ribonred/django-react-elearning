from django.urls import path
from rest_framework import routers
from .mobileview import (
    BerkasLknMobileView,
    TersangkaMobileView,
    BarangBuktiMobileView
)



router = routers.DefaultRouter()



router.register(r'lkn', BerkasLknMobileView)
router.register(r'tersangka', TersangkaMobileView)
router.register(r'barangbukti', BarangBuktiMobileView)
urlpatterns = [

    ]

urlpatterns+=router.urls