from .base import *

# Use 12factor inspired environment variables or from a file
import environ

env = environ.Env()

# Ideally move env file should be outside the git repo
env_file = join(dirname(__file__), 'local.env')
if exists(env_file):
    environ.Env.read_env(str(env_file))

DEBUG = False
TEMPLATE_DEBUG = False

# Must mention ALLOWED_HOSTS in production!
ALLOWED_HOSTS = ['*']

DATABASES = {
    # Raises ImproperlyConfigured exception if DATABASE_URL not in
    # os.environ
    'default': env.db(),
}