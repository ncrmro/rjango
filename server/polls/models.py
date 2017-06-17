from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True)

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)

    def __str__(self):
        return self.choice_text

class Vote(models.Model):
    question = models.ForeignKey(Question)
    selected_choice = models.ForeignKey(Choice)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    class Meta:
        unique_together = (
            ('question', 'user'),
        )