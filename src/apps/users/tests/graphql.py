import json

from django.test import Client, tag

from .helpers import SetUpUser


# Create your tests here.
@tag('unit', 'graphql')
class LogInUserMutationTests(SetUpUser):
    def test_success(self):
        query = {"query": '''
            mutation {
              loginUser(input: {email: "test@user.com", password: "top_secret"}) {
                authFormPayload {
                  __typename
                  ... on Viewer {
                    user {
                      email
                    }
                    tokens {
                      __typename
                    }
                  }
                }
              }
            }
        '''}
        expected = {
            "data": {
                "loginUser": {
                    "authFormPayload": {
                        "__typename": "Viewer",
                        "user": {
                            "email": "test@user.com"
                        },
                        "tokens": {
                            "__typename": "TokensSuccess"
                        }
                    }
                }
            }
        }
        # Make the post request
        c = Client()
        response = c.post('/graphql', query)

        # Decode byte code response.content and load the json
        graphql_response = json.loads(response.content.decode('ascii'))
        self.assertEqual(graphql_response, expected)

    def test_user_doesnt_exist(self):
        query = {"query": '''
            mutation {
              loginUser(input: {email: "userdoesnotexist@user.com", password: "top_secret"}) {
                authFormPayload {
                  __typename
                  ... on Viewer {
                    user {
                      email
                    }
                    tokens {
                      __typename
                    }

                  }
                  ... on AuthFormError {
                    error
                  }
                }
              }
            }
        '''}
        expected = {
            "data": {
                "loginUser": {
                    "authFormPayload": {
                        "__typename": "AuthFormError",
                        "error": "User doesn't exist"
                    }
                }
            }
        }
        # Make the post request
        c = Client()
        response = c.post('/graphql', query)

        # Decode byte code response.content and load the json
        graphql_response = json.loads(response.content.decode('ascii'))
        self.assertEqual(graphql_response, expected)

    def test_wrong_password(self):
        query = {"query": '''
            mutation {
              loginUser(input: {email: "test@user.com", password: "wrong_secret"}) {
                authFormPayload {
                  __typename
                  ... on Viewer {
                    user {
                      email
                    }
                    tokens {
                      __typename
                    }

                  }
                  ... on AuthFormError {
                    error
                  }
                }
              }
            }
        '''}
        expected = {
            "data": {
                "loginUser": {
                    "authFormPayload": {
                        "__typename": "AuthFormError",
                        "error": "Password is incorrect"
                    }
                }
            }
        }
        # Make the post request
        c = Client()
        response = c.post('/graphql', query)

        # Decode byte code response.content and load the json
        graphql_response = json.loads(response.content.decode('ascii'))
        self.assertEqual(graphql_response, expected)


class CreateUserMutationTests(SetUpUser):
    def test_success(self):
        query = {"query": '''
            mutation {
              createUser(input: {email: "test_fake_user@fakerusers.com", password: "test_fake_user_password"}) {
                authFormPayload {
                  __typename
                  ... on Viewer {
                    user {
                      email
                    }
                    tokens {
                      __typename
                    }
                  }
                  ... on AuthFormError {
                    error
                  }
                }
              }
            }

        '''}
        expected = {
            "data": {
                "createUser": {
                    "authFormPayload": {
                        "__typename": "Viewer",
                        "user": {
                            "email": "test_fake_user@fakerusers.com"
                        },
                        "tokens": {
                            "__typename": "TokensSuccess"
                        }
                    }
                }
            }
        }
        # Make the post request
        c = Client()
        response = c.post('/graphql', query)

        # Decode byte code response.content and load the json
        graphql_response = json.loads(response.content.decode('ascii'))
        self.assertEqual(graphql_response, expected)

    def test_user_already_exists(self):
        query = {"query": '''
            mutation {
              createUser(input: {email: "test@user.com", password: "test_password"}) {
                authFormPayload {
                  __typename
                  ... on Viewer {
                    user {
                      email
                    }
                    tokens {
                      ... on TokensSuccess {
                        token
                      }
                    }
                  }
                  ... on AuthFormError {
                    error
                  }
                }
              }
            }
        '''}
        expected = {
            "data": {
                "createUser": {
                    "authFormPayload": {
                        "__typename": "AuthFormError",
                        "error": "User exists"
                    }
                }
            }
        }
        # Make the post request
        c = Client()
        response = c.post('/graphql', query)

        # Decode byte code response.content and load the json
        graphql_response = json.loads(response.content.decode('ascii'))
        self.assertEqual(graphql_response, expected)


class ViewerQueryTests(SetUpUser):
    def test_success(self):
        login_mutation_query = self.login_mutation_with_token

        # Make the post request
        c = Client()
        response = c.post('/graphql', login_mutation_query)
        # Decode byte code response.content and load the json
        login_response = json.loads(response.content.decode('ascii'))

        token = login_response['data']['loginUser']['authFormPayload']['tokens']['token']

        query_with_token = '''
            {
              viewer(jwtToken: "%(token)s") {
                user {
                  email
                }
              }
            }
        ''' % {'token': token}

        viewer_query = {"query": query_with_token}
        response = c.post('/graphql', viewer_query)
        graphql_response = json.loads(response.content.decode('ascii'))

        expected = {
            "data": {
                "viewer": {
                    "user": {
                        "email": "test@user.com"
                    }
                }
            }
        }

        self.assertEqual(graphql_response, expected)
