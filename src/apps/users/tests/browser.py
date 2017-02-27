import json

from django.test import TestCase, Client, LiveServerTestCase
from django.conf import settings
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from django.contrib.auth import get_user_model
import time


class CreateUserTest(LiveServerTestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            first_name='test',
            last_name='user',
            email='test@user.com',
            password='top_secret'
        )
        if settings.SELENIUM_HOST:
            self.selenium = webdriver.Remote(
                command_executor=settings.SELENIUM_HOST,
                desired_capabilities=DesiredCapabilities.CHROME
            )
        else:
            self.selenium = webdriver.Firefox()
            self.selenium.get(self.live_server_url + "/signup")
        super(CreateUserTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(CreateUserTest, self).tearDown()

    def test_sign_up_form_errors(self):
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url + "/signup")

        # Find Fields
        email_field = selenium.find_element_by_id("textfield-Email")
        password = selenium.find_element_by_id("textfield-Password")
        password_confirmation = selenium.find_element_by_id("textfield-PasswordConfirmation")

        # Click Button to check for empty values and check
        selenium.find_element_by_xpath("//button[text()='Sign up']").click()
        assert 'Email isn\'t valid' in selenium.page_source
        assert 'Passwords don\'t match' in selenium.page_source

        # Fill out inputs and check for form valid
        email_field.send_keys("sign_up_test_user@test.com")
        password.send_keys("test_password")
        password_confirmation.send_keys("test_password")

        assert 'Email isn\'t valid' not in selenium.page_source
        assert 'Passwords don\'t match' not in selenium.page_source

    def test_sign_up_form_sucess(self):
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url + "/signup")

        # Find Fields
        email_field = selenium.find_element_by_id("textfield-Email")
        password = selenium.find_element_by_id("textfield-Password")
        password_confirmation = selenium.find_element_by_id("textfield-PasswordConfirmation")

        # Fill out inputs and check for form valid
        email_field.send_keys("sign_up_test_user@test.com")
        password.send_keys("test_password")
        password_confirmation.send_keys("test_password")

        # Click Button to check for empty values and check
        selenium.find_element_by_xpath("//button[text()='Sign up']").click()

        time.sleep(3)
        assert 'Email isn\'t valid' not in selenium.page_source
        assert 'Profile' in selenium.page_source


class LoginUserTest(LiveServerTestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            first_name='test',
            last_name='user',
            email='test@user.com',
            password='top_secret'
        )
        if settings.SELENIUM_HOST:
            self.selenium = webdriver.Remote(
                command_executor=settings.SELENIUM_HOST,
                desired_capabilities=DesiredCapabilities.CHROME
            )
        else:
            self.selenium = webdriver.Firefox()
        super(LoginUserTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(LoginUserTest, self).tearDown()

    def test_login_form(self):
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url + "/login")
        selenium.save_screenshot('./screenshots/login_page_1.png')

        # Find Fields
        email_field = selenium.find_element_by_id("textfield-Email")
        password = selenium.find_element_by_id("textfield-Password")

        # Click Button to check for empty values and check
        selenium.find_element_by_xpath("//button[text()='Login']").click()
        selenium.save_screenshot('./screenshots/login_page_2_invalid.png')
        assert 'Email isn\'t valid' in selenium.page_source
        assert 'Passwords is blank' in selenium.page_source

        # Fill out inputs and check for form valid
        email_field.send_keys("test@user.com")
        password.send_keys("top_secret")
        selenium.save_screenshot('./screenshots/login_page_3_now_valid.png')
        assert 'Email isn\'t valid' not in selenium.page_source
        assert 'Passwords is blank' not in selenium.page_source

        selenium.find_element_by_xpath("//button[text()='Login']").click()
        time.sleep(3)
        assert 'Profile' in selenium.page_source
        selenium.save_screenshot('./screenshots/login_page_4_redirected_to_profile.png')


class RouteRedirectTests(LiveServerTestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            first_name='test',
            last_name='user',
            email='test@user.com',
            password='top_secret'
        )
        if settings.SELENIUM_HOST:
            self.selenium = webdriver.Remote(
                command_executor=settings.SELENIUM_HOST,
                desired_capabilities=DesiredCapabilities.CHROME
            )
        else:
            self.selenium = webdriver.Firefox()
        super(RouteRedirectTests, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(RouteRedirectTests, self).tearDown()

    def test_require_not_auth(self):
        """Should redirect if not authenticated"""
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url + "/profile")
        # Should redirect aways from profile route
        assert 'Profile' not in selenium.page_source

    def test_require_auth(self):
        """Should redirect if not authenticated"""
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url + "/profile")

        selenium.get(self.live_server_url + "/login")
        selenium.save_screenshot('./screenshots/login_page_1.png')

        # Find Fields
        email_field = selenium.find_element_by_id("textfield-Email")
        password = selenium.find_element_by_id("textfield-Password")

        # Fill out inputs and check for form valid
        email_field.send_keys("test@user.com")
        password.send_keys("top_secret")

        selenium.find_element_by_xpath("//button[text()='Login']").click()
        time.sleep(3)
        # Should be on profile after login redirect
        assert 'Profile' in selenium.page_source

        # Should now be logged in attempts to hit routes where user shouldn't be authenticated redirect
        selenium.get(self.live_server_url + "/login")
        time.sleep(3)
        assert 'Login' not in selenium.page_source
        assert 'Profile' in selenium.page_source

        # Should now be logged in attempts to hit routes where user shouldn't be authenticated redirect
        selenium.get(self.live_server_url + "/signup")
        time.sleep(3)
        assert 'Sign Up' not in selenium.page_source
        assert 'Profile' in selenium.page_source
