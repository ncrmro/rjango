from django.db import models
from django.contrib.auth.models import User

class TodoModel(models.Model):
    user = models.ForeignKey(User)
    text = models.CharField(max_length=100)

    class Meta:
        verbose_name = "todo"