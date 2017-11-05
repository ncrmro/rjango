from .base import *

SECRET_KEY = env('SECRET_KEY')
JWT_SECRET_KEY = env('JWT_SECRET_KEY')

ALLOWED_HOSTS = env('ALLOWED_HOSTS')

DEBUG = False
TEMPLATE_DEBUG = False



# Simplified static file serving.
# https://warehouse.python.org/project/whitenoise/

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
