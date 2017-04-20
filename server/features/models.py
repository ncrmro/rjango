from django.conf import settings
from django.db import models


class FeatureModel(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    url = models.CharField(max_length=100)

    class Meta:
        verbose_name = "feature"
