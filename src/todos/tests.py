import json
from django.contrib.auth.models import User
from django.test import TestCase, RequestFactory
from django.http import JsonResponse

from .models import TodoModel


# Create your tests here.
class TodoTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test_user',
            first_name='test',
            last_name='user',
            email='test@user.com',
            password='top_secret'
        )

        TodoModel.objects.create(user=self.user, text="My todo")

    def test_todo_created_was_created(self):
        todo = TodoModel.objects.get(text="My todo")
        self.assertEqual(todo.text, 'My todo')
