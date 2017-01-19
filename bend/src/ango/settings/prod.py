from os.path import join, exists
from .base import *

# Use 12factor inspired environment variables or from a file
import environ

env = environ.Env()

# Ideally move env file should be outside the git repo
env_file = join(dirname(__file__), 'local.env')
if exists(env_file):
    environ.Env.read_env(str(env_file))

SECRET_KEY = env('SECRET_KEY')

ALLOWED_HOSTS = env('ALLOWED_HOSTS')

DEBUG = False
TEMPLATE_DEBUG = False

DATABASES = {
    # Raises ImproperlyConfigured exception if DATABASE_URL not in
    # os.environ
    'default': env.db(),
}
# Simplified static file serving.
# https://warehouse.python.org/project/whitenoise/

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
