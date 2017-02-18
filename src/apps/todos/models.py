from django.db import models
from django.conf import settings


class TodoModel(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    text = models.CharField(max_length=100)

    class Meta:
        verbose_name = "todo"