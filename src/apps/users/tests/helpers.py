import json

from django.conf import settings
from django.contrib.auth import get_user_model
from django.test import Client
from django.test import TestCase, LiveServerTestCase
from django.test import tag
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def get_query_response(query):
    c = Client()
    response = c.post('/graphql', query)
    response = json.loads(response.content.decode('ascii'))
    return response


def get_token(login_response):
    token = login_response['data']['loginUser']['authFormPayload']['tokens']['token']
    return token


def wait_for_element(selenium, expected_conditions):
    element = WebDriverWait(selenium, 10).until(expected_conditions)
    return element


def login_selenium_user(self):
    selenium = self.selenium
    selenium.get(self.live_server_url)

    login_button = wait_for_element(selenium, EC.element_to_be_clickable((By.LINK_TEXT, 'Login')))

    login_button.click()

    email_field = wait_for_element(selenium, EC.element_to_be_clickable((By.ID, 'textfield-Email')))

    password = selenium.find_element_by_id("textfield-Password")

    email_field.send_keys("test@user.com")
    password.send_keys("top_secret")
    selenium.find_element_by_xpath("//button[text()='Login']").click()

    wait_for_element(selenium, EC.visibility_of_element_located((By.XPATH, "//h1[text()='Dashboard']")))
    assert 'Dashboard' in selenium.page_source
    return selenium


@tag('with-user')
class SetUpUser(TestCase):
    """Any test that needs a user"""

    def setUp(self):
        super(SetUpUser, self).setUp()
        self.user = get_user_model().objects.create_user(
                first_name='test',
                last_name='user',
                email='test@user.com',
                password='top_secret'
        )
        self.make_query = get_query_response
        self.login_mutation_with_token = {
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
        self.get_token = get_token


@tag('browser')
class SetBrowserTests(LiveServerTestCase):
    """Any test that needs selenium support"""

    def setUp(self):
        self.login_selenium_user = login_selenium_user
        if settings.SELENIUM_HOST:
            self.selenium = webdriver.Remote(
                    command_executor=settings.SELENIUM_HOST,
                    desired_capabilities=DesiredCapabilities.CHROME
            )
        else:
            self.selenium = webdriver.Chrome()
            self.selenium.set_window_size(1400, 1000)
        super(SetBrowserTests, self).setUp()
