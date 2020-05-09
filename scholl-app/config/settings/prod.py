from .base import *
DEBUG = os.getenv('DEBUG')



STATIC_URL = os.getenv('STATIC')

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("redis", 6379)],   # Change localhost to the ip in which you have redis server running on.
        },
    },
}

if os.getenv("postgres"):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': os.getenv('DBNAME'),  # dbname
            'USER': os.getenv('DBUSER'),
            'PASSWORD': os.getenv('DBPASSWORD'),
            'HOST': os.getenv('DBHOST'),
            'PORT': os.getenv('DBPORT'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_R, 'db.sqlite3'),
        }
    }
