import json

from django.test import Client, tag

from .helpers import SetUpUser


# Create your tests here.
@tag('unit', 'graphql')
class LogInUserMutationTests(SetUpUser):
    def test_success(self):
        query = {
            "query": '''
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
        '''
        }
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
        response = self.make_query(query)

        self.assertEqual(response, expected)

    def test_user_doesnt_exist(self):
        query = {
            "query": '''
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
                  ... on FormErrors {
                    errors {
                      key
                      message
                    }
                  }
                }
              }
            }
        '''
        }
        expected = {
            'data': {
                'loginUser': {
                    'authFormPayload': {
                        'errors': [{'message': "A user with this email doesn't exist.", 'key': 'email'}],
                        '__typename': 'FormErrors'
                    }
                }
            }
        }
        response = self.make_query(query)

        self.assertEqual(response, expected)

    def test_wrong_password(self):
        query = {
            "query": '''
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
                  ... on FormErrors {
                    errors {
                      key
                      message
                    }
                  }
                }
              }
            }
        '''
        }
        expected = {
            'data': {
                'loginUser': {
                    'authFormPayload': {
                        'errors': [{'key': 'password', 'message': 'Password is incorrect'}], '__typename': 'FormErrors'
                    }
                }
            }
        }
        response = self.make_query(query)

        self.assertEqual(response, expected)


class CreateUserMutationTests(SetUpUser):
    def test_success(self):
        query = {
            "query": '''
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
                  ... on FormErrors {
                    errors {
                      key
                      message
                    }
                  }
                }
              }
            }

        '''
        }
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
        response = self.make_query(query)
        print(response)
        self.assertEqual(response, expected)

    def test_user_already_exists(self):
        query = {
            "query": '''
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
                  ... on FormErrors {
                    errors {
                      key
                      message
                    }
                  }
                }
              }
            }
        '''
        }
        expected = {
            'data': {
                'createUser': {
                    'authFormPayload': {
                        '__typename': 'FormErrors',
                        'errors': [{'message': 'A user with this email already exists.', 'key': 'email'}]
                    }
                }
            }
        }
        response = self.make_query(query)

        self.assertEqual(response, expected)


class ViewerQueryTests(SetUpUser):
    def test_success(self):
        query = self.login_mutation_with_token
        response = self.make_query(query)
        token = self.get_token(response)

        query_with_token = '''
            {
              viewer(jwtToken: "%(token)s") {
                user {
                  email
                }
              }
            }
        ''' % {'token': token}

        query = {"query": query_with_token}

        expected = {
            "data": {
                "viewer": {
                    "user": {
                        "email": "test@user.com"
                    }
                }
            }
        }

        response = self.make_query(query)

        self.assertEqual(response, expected)
