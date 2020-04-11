from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token as tokenview
from django.urls import path, include

urlpatterns = [
    path('token-auth/', tokenview),
    path('token-refresh/', refresh_jwt_token),
]
