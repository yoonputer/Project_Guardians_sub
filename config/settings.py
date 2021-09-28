"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 3.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-!e9#g=mm$1_q57nxubo9p6)qhecwyuuzj3$un68mso-#q101vq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'project03'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [

os.path.join(BASE_DIR, 'static')

]


DATA_DIRS = [

os.path.join(BASE_DIR, 'data')

]

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
#
# LOG_FILE = os.path.join(BASE_DIR,'data/mylog.csv');
#
# LOGGING = {
#     'version': 1,
#     # 기존의 로깅 설정을 비활성화 할 것인가?
#     'disable_existing_loggers': False,
#     # 포맷터
#     # 로그 레코드는 최종적으로 텍스트로 표현됨
#     # 이 텍스트의 포맷 형식 정의
#     # 여러 포맷 정의 가능
#     'formatters': {
#         'format1': {
#             'format': '[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s',
#             'datefmt': '%d/%b/%Y %H:%M:%S'
#         },
#         'format2': {
#             'format': '%(levelname)s %(message)s'
#         },
#     },
#     # 핸들러
#     # 로그 레코드로 무슨 작업을 할 것인지 정의
#     # 여러 핸들러 정의 가능
#     'handlers': {
#         # 로그 파일을 만들어 텍스트로 로그레코드 저장
#         'file': {
#             'level': 'DEBUG',
#             'class': 'logging.FileHandler',
#             'filename': LOG_FILE,
#             'formatter': 'format1',
#         },
#         # 콘솔(터미널)에 출력
#     'console': {
#         'level': 'DEBUG',
#         'class': 'logging.StreamHandler',
#         'formatter': 'format2',
#     }
#     },
#     # 로거
#     # 로그 레코드 저장소
#     # 로거를 이름별로 정의
#     'loggers': {
#         'users': {
#             'handlers': ['file'],
#             'level': 'DEBUG',
#         },
#         'items': {
#             'handlers': ['console'],
#             'level': 'DEBUG',
#         }
#     },
# }