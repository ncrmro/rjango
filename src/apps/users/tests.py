import json

from django.test import TestCase, Client, LiveServerTestCase
from django.conf import settings
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities


class SignUpUserTest(LiveServerTestCase):
    def setUp(self):
        if settings.SELENIUM_HOST:
            self.selenium = webdriver.Remote(
                command_executor=settings.SELENIUM_HOST,
                desired_capabilities=DesiredCapabilities.CHROME
            )
        else:
            self.selenium = webdriver.Firefox()
        super(SignUpUserTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(SignUpUserTest, self).tearDown()

    def test_sign_up_form(self):
        selenium = self.selenium
        selenium.implicitly_wait(10)  # seconds
        # Opening the link we want to test
        selenium.get(self.live_server_url + "/signup")
        selenium.save_screenshot('./screenshots/sign_up_page.png')

        # Find Fields
        card_number_field = selenium.find_element_by_id("textfield-Email")
        password = selenium.find_element_by_id("textfield-Password")
        password_confirmation = selenium.find_element_by_id("textfield-PasswordConfirmation")

        # Click Button to check for empty values and check
        selenium.find_element_by_xpath("//button[text()='Sign up']").click()
        selenium.save_screenshot('./screenshots/sign_up_page_invalid.png')
        assert 'Email isn\'t valid' in selenium.page_source
        assert 'Passwords don\'t match' in selenium.page_source

        # Fill out inputs and check for form valid
        card_number_field.send_keys("test@email.com")
        password.send_keys("test_password")
        password_confirmation.send_keys("test_password")
        selenium.save_screenshot('./screenshots/sign_up_page_now_valid.png')
        assert 'Email isn\'t valid' not in selenium.page_source
        assert 'Passwords don\'t match' not in selenium.page_source

