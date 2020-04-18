from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token as tokenview, verify_jwt_token
from django.urls import path, include
from .views import LoginView
urlpatterns = [
    path('token-auth/', tokenview),
    path('token-refresh/', refresh_jwt_token),
    path('token-verify/', verify_jwt_token),
]
