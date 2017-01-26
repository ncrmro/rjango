from .base import *

SECRET_KEY = 'ojk@86z9*$zyuhge#3)p*%$q0psoo2lq*tv9jw90#1eezcl^y2'

INSTALLED_APPS += (
    'django_nose',)
TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

# Must mention ALLOWED_HOSTS in production!
ALLOWED_HOSTS = ['*']

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': join(BASE_DIR, 'db.sqlite3'),
    }
}

