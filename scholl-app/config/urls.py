from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from backendmodel.account.views import ApiUserView
from backendmodel.organizations.views import CompanyView, CompanyDivisionView

router = routers.DefaultRouter()
router.register(r'users', ApiUserView)
router.register(r'company', CompanyView)
router.register(r'companydiv', CompanyDivisionView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('get-token/', include('backendmodel.account.urls')),
]


if settings.DEBUG:
    print(settings.STATIC_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
