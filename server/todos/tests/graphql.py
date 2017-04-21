from django.test import TestCase
from django.test import tag

from users.tests.helpers import create_test_user, get_jwt_token, make_query
import json

from django.contrib.auth import get_user_model
from django.test import TestCase, Client

from todos.models import Todo


# Create your tests here.


@tag('unit', 'graphql')
class UserTodos(TestCase):
    def setUp(self):
        self.user = create_test_user()

        self.jwt_token = get_jwt_token()

        super(UserTodos, self).setUp()

    def test_create_user_todo_mutation(self):
        mutation_input_vars = {
            "text": "Todo Text",
        }
        # Note some have "" around theme
        mutation_input = '''{
                text: "%(text)s"
            }''' % mutation_input_vars

        mutation_with_input = '''
                   mutation{
                     createUserTodo(input: %(mutation_input)s){
                       todoEdge {
                          node {
                            text
                          }
                        }
                        user {
                          todos(first: 10) {
                            edges {
                              node {
                                text
                              }
                            }
                          }
                        }
                      }
                    }

               ''' % {'mutation_input': mutation_input}

        viewer_query = {"query": mutation_with_input}
        response = make_query(viewer_query, jwt_token=self.jwt_token)
        expected = {
            'data': {
                'createUserTodo': {
                    'user':            {
                        'todos': {'edges': [{'node': {'text': 'Todo Text'}}]}
                        }, 'todoEdge': {'node': {'text': 'Todo Text'}}
                    }
                }
            }
        self.assertEqual(response, expected)

class TodoTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            first_name='test',
            last_name='user',
            email='test@user.com',
            password='top_secret'
        )

        Todo.objects.create(user=self.user, text="My todo")

    def test_all_todos_graphql_endpoint(self):
        """Test all_todos graphql query"""

        # Sanity Checks
        todo = Todo.objects.get(text="My todo")
        self.assertEqual(todo.text, 'My todo')

        # Setup query and response
        query = {
            "query": "query {todos(first: 10){edges{node{id,text}}}}"
        }
        expected_response = {
            "data": {
                "todos": {
                    "edges": [
                        {
                            "node": {
                                "id": "VG9kb05vZGU6MQ==",
                                "text": "My todo"
                            }}
                    ]}
            }
        }
        # Make the post request
        c = Client()
        response = c.post('/graphql', query)

        # Decode byte code response.content and load the json
        graphql_response = json.loads(response.content.decode('ascii'))
        self.assertEqual(graphql_response, expected_response)
