from django.test import tag, TestCase

from tests.utils import set_up_user, login_mutation_with_token, get_token, \
    make_query

# Create your tests here.
@tag('unit', 'graphql')
class LogInUserMutationTests(TestCase):
    def setUp(self):
        self = set_up_user(self)
        super(LogInUserMutationTests, self).setUp()

    def test_success(self):
        query = {
            "query": '''
            mutation {
              login(input: {email: "test@user.com", password: "top_secret"}) {
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
                "login": {
                    "authFormPayload": {
                        "__typename": "Viewer",
                        "user":       {
                            "email": "test@user.com"
                        },
                        "tokens":     {
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
              login(input: {email: "userdoesnotexist@user.com", password: "top_secret"}) {
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
                'login': {
                    'authFormPayload': {
                        'errors':     [{
                                           'message': "A user with this email doesn't exist.",
                                           'key':     'email'
                                       }],
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
              login(input: {email: "test@user.com", password: "wrong_secret"}) {
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
                'login': {
                    'authFormPayload': {
                        'errors':                    [{
                                                          'key':     'password',
                                                          'message': 'Password is incorrect'
                                                      }],
                        '__typename':                'FormErrors'
                    }
                }
            }
        }
        response = self.make_query(query)

        self.assertEqual(response, expected)


class CreateUserMutationTests(TestCase):
    def test_success(self):
        query = {
            "query": '''
            mutation {
              signup(input: {email: "test_fake_user@fakerusers.com", password: "test_fake_user_password"}) {
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
                "signup": {
                    "authFormPayload": {
                        "__typename": "Viewer",
                        "user":       {
                            "email": "test_fake_user@fakerusers.com"
                        },
                        "tokens":     {
                            "__typename": "TokensSuccess"
                        }
                    }
                }
            }
        }
        response = make_query(query)
        self.assertEqual(response, expected)

    def test_user_already_exists(self):
        self = set_up_user(self)

        query = {
            "query": '''
            mutation {
              signup(input: {email: "test@user.com", password: "test_password"}) {
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
                'signup': {
                    'authFormPayload': {
                        '__typename': 'FormErrors',
                        'errors':     [{
                                           'message': 'A user with this email already exists.',
                                           'key':     'email'
                                       }]
                    }
                }
            }
        }
        response = make_query(query)

        self.assertEqual(response, expected)


@tag('unit', 'graphql')
class ViewerQueryTests(TestCase):
    def test_success(self):
        self = set_up_user(self)
        login_mutation_query = login_mutation_with_token

        login_response = make_query(login_mutation_query)
        token = get_token(login_response)

        query_with_token = '''
            {
              viewer {
                user {
                  email
                }
              }
            }
        '''

        viewer_query = {"query": query_with_token}
        response = make_query(viewer_query, token)

        expected = {
            "data": {
                "viewer": {
                    "user": {
                        "email": "test@user.com"
                    }
                }
            }
        }

        self.assertEqual(response, expected)
