import datetime

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

from users.tests.helpers import SetUpUser, SetBrowserTests, wait_for_element
from django.contrib.auth import get_user_model
from django.test import override_settings, modify_settings


class CreateUserTest(SetBrowserTests, SetUpUser):
    def setUp(self):
        super(CreateUserTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(CreateUserTest, self).tearDown()

    def test_sign_up_form_errors(self):
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url)

        sign_up_button = wait_for_element(
            selenium, EC.element_to_be_clickable(
                (By.LINK_TEXT, 'Sign up')))
        sign_up_button.click()

        # Find Fields
        email_field = wait_for_element(
            selenium, EC.element_to_be_clickable(
                (By.ID, 'textfield-Email')))
        password = selenium.find_element_by_id("textfield-Password")
        password_confirmation = selenium.find_element_by_id(
            "textfield-PasswordConfirmation")

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

    def test_sign_up_form_user_exists(self):
        print(get_user_model().objects.get(email=self.user.email))
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url)

        sign_up_button = wait_for_element(
            selenium, EC.element_to_be_clickable(
                (By.LINK_TEXT, 'Sign up')))
        sign_up_button.click()

        # Find Fields
        email_field = wait_for_element(
            selenium, EC.element_to_be_clickable(
                (By.ID, 'textfield-Email')))
        password = selenium.find_element_by_id("textfield-Password")
        password_confirmation = selenium.find_element_by_id(
            "textfield-PasswordConfirmation")

        # Fill out inputs and check for form valid
        email_field.send_keys(self.user.email)
        password.send_keys(self.user_password)
        password_confirmation.send_keys(self.user_password)
        selenium.save_screenshot('./screenshots/sign_up_form_exists.png')
        selenium.find_element_by_xpath("//button[text()='Sign up']").click()
        wait_for_element(
            selenium,
            EC.text_to_be_present_in_element(
                (By.CSS_SELECTOR,
                 '.mdl-textfield__error'),
                'A user with this email already exists.'))
        assert 'A user with this email already exists' in selenium.page_source

    def test_sign_up_form_success(self):
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url)

        sign_up_button = wait_for_element(
            selenium, EC.element_to_be_clickable(
                (By.LINK_TEXT, 'Sign up')))
        sign_up_button.click()

        # Find Fields
        email_field = wait_for_element(
            selenium, EC.element_to_be_clickable(
                (By.ID, 'textfield-Email')))
        password = selenium.find_element_by_id("textfield-Password")
        password_confirmation = selenium.find_element_by_id(
            "textfield-PasswordConfirmation")

        # Fill out inputs and check for form valid
        email_field.send_keys("sign_up_test_user@test.com")
        password.send_keys("test_password")
        password_confirmation.send_keys("test_password")

        # Click Button to check for empty values and check
        selenium.find_element_by_xpath("//button[text()='Sign up']").click()
        wait_for_element(
            selenium, EC.visibility_of_element_located(
                (By.XPATH, "//h1[text()='Dashboard']")))

        assert 'Email isn\'t valid' not in selenium.page_source
        assert 'Dashboard' in selenium.page_source


class LoginUserTest(SetBrowserTests, SetUpUser):
    def setUp(self):
        super(LoginUserTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(LoginUserTest, self).tearDown()

    def test_login_form(self):
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url)
        login_button = wait_for_element(
            selenium, EC.element_to_be_clickable(
                (By.LINK_TEXT, 'Login')))

        login_button.click()

        selenium.save_screenshot('./screenshots/login_page_1.png')

        # Find Fields
        email_field = wait_for_element(
            selenium, EC.element_to_be_clickable(
                (By.ID, 'textfield-Email')))
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

        wait_for_element(
            selenium, EC.visibility_of_element_located(
                (By.XPATH, "//h1[text()='Dashboard']")))
        selenium.save_screenshot(
            './screenshots/login_page_4_redirected_to_profile.png')
        assert 'Dashboard' in selenium.page_source


class JwtTokenEpiredTest(SetBrowserTests, SetUpUser):
    """Expired tokens should log user out"""

    def setUp(self):
        super(JwtTokenEpiredTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(JwtTokenEpiredTest, self).tearDown()

    @override_settings(JWT_EXPIRATION_DELTA=datetime.timedelta(seconds=3))
    def test_login_form(self):
        selenium = self.login_selenium_user(self)
        import time
        time.sleep(5)
        edit_profile_button = wait_for_element(
            selenium, EC.element_to_be_clickable(
                (By.LINK_TEXT, 'Edit Profile')))
        edit_profile_button.click()

        assert 'Profile' not in selenium.page_source
        assert 'Dashboard' not in selenium.page_source
