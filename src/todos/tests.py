from django.contrib.auth.models import User
from django.test import TestCase, RequestFactory
from .models import TodoModel


# Create your tests here.
class TodoTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test_user',
            first_name='test',
            last_name='user',
            email='test@user.com',
            password='top_secret'
        )

        TodoModel.objects.create(user=self.user, text="roar")

    def test_animals_can_speak(self):
        todo = TodoModel.objects.get(text="roar")
