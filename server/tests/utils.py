import json

from django.conf import settings
from django.contrib.auth import get_user_model
from django.test import Client, TestCase, LiveServerTestCase, tag
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

def make_query(query, jwt_token=None):
    c = Client()
    if jwt_token:
        auth_header = 'Bearer {}'.format(jwt_token)
        response = c.post('/graphql', query, HTTP_AUTHORIZATION=auth_header)
    else:
        response = c.post('/graphql', query)
    response = json.loads(response.content.decode('ascii'))
    return response


def get_token(login_response):
    token = login_response['data']['login']['authFormPayload']['tokens'][
        'token']
    return token


def wait_for_element(selenium, expected_conditions):
    element = WebDriverWait(selenium, 10).until(expected_conditions)
    return element


def css_selector(selenium, css_selector):
    element = wait_for_element(
            selenium, EC.element_to_be_clickable(
                    (By.CSS_SELECTOR, css_selector)))
    return element


def id_selector(selenium, id_selector):
    element = wait_for_element(
            selenium, EC.element_to_be_clickable(
                    (By.ID, id_selector)))

    return element

def account_dropdown_selector(selenium):
    return css_selector(selenium, '.button_open-user-dropdown')

def assert_post_auth_page(selenium):
    wait_for_element(selenium, EC.visibility_of_element_located(
            (By.XPATH, "//h1[text()='New System']")))

def login_selenium_user(self):
    selenium = self.selenium
    selenium.get(self.live_server_url)
    self.assertTrue(get_user_model().objects.get(email='test@user.com'))

    css_selector(selenium, '.button_login-link').click()
    email_field = css_selector(selenium, 'input#email')
    password_field = css_selector(selenium, 'input#password')

    email_field.send_keys("test@user.com")
    password_field.send_keys("top_secret")
    css_selector(selenium, '.button_submit-login-form').click()

    assert_post_auth_page(selenium)
    return selenium


def create_test_user():
    user = get_user_model().objects.create_user(
            first_name='test',
            last_name='user',
            email='test@user.com',
            password='top_secret'
    )
    return user


login_mutation_with_token = {
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
                      ... on TokensSuccess {
                        token
                      }
                    }
                  }
                }
              }
            }
        '''
}


def get_jwt_token():
    response = make_query(login_mutation_with_token)
    token = get_token(response)
    return token



def set_up_user(self):
    self.user = create_test_user()
    self.make_query = make_query
    self.login_mutation_with_token = login_mutation_with_token
    self.get_token = get_token
    return self


def set_up_selenium():
    if settings.SELENIUM_HOST:
        selenium = webdriver.Remote(
                command_executor=settings.SELENIUM_HOST,
                desired_capabilities=DesiredCapabilities.CHROME
        )
    else:
        selenium = webdriver.Chrome()
        selenium.set_window_size(1400, 1000)
    return selenium


@tag('browser')
class SetBrowserTests(LiveServerTestCase):
    """Any test that needs selenium support"""

    def setUp(self):
        self.selenium = set_up_selenium()
        self.login_selenium_user = login_selenium_user
        super(SetBrowserTests, self).setUp()
