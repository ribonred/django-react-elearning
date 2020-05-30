from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import indexview,notification_test_page
from rest_framework import routers
from backendmodel.account.views import ApiUserView
from backendmodel.organizations.views import (
    BerkasLknView,
    PenangkapanView,
    TersangkaView,
    ProsesPengadilanView,
    TersangkaEditDetailView,
    BarangBuktiEditView,
    LknDetailApiView,
    ProsesTersangkaView,
    StatusTersangkaView,
    StatusBarangBuktiView,
    StatusBBapprovalView
    
)
router = routers.DefaultRouter()
router.register(r'users', ApiUserView)
router.register(r'lkn', BerkasLknView)
router.register(r'pnkp', PenangkapanView)
router.register(r'tersangka', TersangkaView)
router.register(r'proses', ProsesPengadilanView)
router.register(r'tsk-edit', TersangkaEditDetailView)
router.register(r'tsk-proses', ProsesTersangkaView)
router.register(r'tsk-status', StatusTersangkaView)
router.register(r'bb-edit', BarangBuktiEditView)
router.register(r'bb-status', StatusBarangBuktiView)
router.register(r'lkn-detail', LknDetailApiView)
router.register(r'bb-status', StatusBarangBuktiView)
router.register(r'bb-status-app', StatusBBapprovalView)
# router.register(r'companydiv', CompanyDivisionView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path("mobile-api/", include('backendmodel.organizations.urls')),
    path('get-token/', include('backendmodel.account.urls')),
    path('', indexview.as_view(),name='index'),
    path('notif/', notification_test_page,name='test'),

    ]


if settings.DEBUG:
    print(settings.STATIC_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
