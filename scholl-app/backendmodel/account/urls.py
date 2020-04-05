from rest_framework_jwt.views import obtain_jwt_token as tokenview
from django.urls import path, include

urlpatterns = [
    path('token-auth/', tokenview),
]
