from django.db import models
from django.contrib.auth.models import User


class FeatureModel(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    url = models.CharField(max_length=100)

    class Meta:
        verbose_name = "feature"
