"""
Django settings for reango project.
"""

from os.path import dirname, join, exists
import datetime

# Use 12factor inspired environment variables or from a file
import environ

# Build paths inside the project like this: join(BASE_DIR, "directory")
BASE_DIR = dirname(dirname(dirname(dirname(__file__))))

env = environ.Env()

# Ideally move env file should be outside the git repo
env_file = join(BASE_DIR, '.env')
if exists(env_file):
    environ.Env.read_env(str(env_file))

# Define STATIC_ROOT for the collectstatic command
STATIC_ROOT = join(BASE_DIR, 'static')
STATIC_URL = '/static/'
MEDIA_ROOT = join(BASE_DIR, 'media')
MEDIA_URL = "/media/"
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'webpack_loader',
    'graphene_django',
    'custom_user',
    'users',
    'todos',
    'features'
]

AUTH_USER_MODEL = 'users.CustomUser'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'reango.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            join(BASE_DIR, 'src', 'reango', 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'reango.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTHENTICATION_BACKENDS = [
    'users.backends.UserModelEmailBackend',    # Login w/ email
]


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

GRAPHENE = {
    'SCHEMA': 'reango.schema.schema',  # Where your Graphene schema lives
    'SCHEMA_OUTPUT': './webpack/server/data/schema.json'  # defaults to schema.json
}

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': join(BASE_DIR, 'static', 'webpack-stats.json'),
    }
}

# JWT_EXPIRATION_DELTA = datetime.timedelta(days=7)



JWT_ALGORITHM = 'HS256'
JWT_VERIFY = True
JWT_VERIFY_EXPIRATION = True
JWT_LEEWAY = 0
JWT_EXPIRATION_DELTA = datetime.timedelta(hours=1)
JWT_ALLOW_REFRESH = False
JWT_REFRESH_EXPIRATION_DELTA = datetime.timedelta(days=7)