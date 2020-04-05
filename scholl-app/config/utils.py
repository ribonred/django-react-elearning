from backendmodel.account.serializer import ApiUser


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': ApiUser(user, context={'request': request}).data
    }
