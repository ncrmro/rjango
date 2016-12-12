import json

from django.contrib.auth.models import User
from django.test import TestCase, Client

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

    def test_all_todos_graphql_endpoint(self):
        """Test all_todos graphql query"""
        query = {
            "query": "query {allTodos(first: 10){edges{node{id,text}}}}"
        }
        expected_response = {
            "data": {
                "allTodos": {
                    "edges": [
                        {
                            "node": {
                                "id": "VG9kb05vZGU6MQ==",
                                "text": "My todo"
                            }}
                    ]}
            }
        }
        c = Client()
        response = c.post('/graphql', query)
        # Decode byte code response.content and load the json
        graphql_response = json.loads(response.content.decode('ascii'))
        print(graphql_response)
        self.assertEqual(graphql_response, expected_response)
