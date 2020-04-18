from .serializer import ApiUser


def jwt_response_payload_handler(token, user=None, request=None):
    user = ApiUser(user, context={'request': request}).data
    return {
        'token': token,
        'user': user
    }
