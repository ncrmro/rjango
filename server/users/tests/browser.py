import datetime

from django.test import override_settings
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

from tests.utils import SetBrowserTests, wait_for_element, \
    css_selector, create_test_user

class CreateUserTest(SetBrowserTests):
    def setUp(self):
        super(CreateUserTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(CreateUserTest, self).tearDown()

    def test_sign_up_form_errors(self):
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url)

        css_selector(selenium, '.button_sign-up-link').click()

        # Find Fields
        email_field = wait_for_element(selenium, EC.element_to_be_clickable(
                (By.ID, 'textfield-Email')))
        password = selenium.find_element_by_id("textfield-Password")
        password_confirmation = selenium.find_element_by_id(
                "textfield-PasswordConfirmation")

        # Click Button to check for empty values and check
        css_selector(selenium, '.button_submit-signup-form').click()
        # assert 'Email isn\'t valid' in selenium.page_source
        # assert 'Passwords don\'t match' in selenium.page_source

        # Fill out inputs and check for form valid
        email_field.send_keys("sign_up_test_user@test.com")
        password.send_keys("test_password")
        password_confirmation.send_keys("test_password")

        assert 'Email isn\'t valid' not in selenium.page_source
        assert 'Passwords don\'t match' not in selenium.page_source

    def test_sign_up_form_success(self):
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url)

        css_selector(selenium, '.button_sign-up-link').click()

        # Find Fields
        email_field = wait_for_element(selenium, EC.element_to_be_clickable(
                (By.ID, 'textfield-Email')))
        password = selenium.find_element_by_id("textfield-Password")
        password_confirmation = selenium.find_element_by_id(
                "textfield-PasswordConfirmation")

        # Fill out inputs and check for form valid
        email_field.send_keys("sign_up_test_user@test.com")
        password.send_keys("test_password")
        password_confirmation.send_keys("test_password")

        # Click Button to check for empty values and check
        css_selector(selenium, '.button_submit-signup-form').click()
        wait_for_element(selenium, EC.visibility_of_element_located(
            (By.XPATH, "//h1[text()='Dashboard']")))

        assert 'Email isn\'t valid' not in selenium.page_source
        assert 'Dashboard' in selenium.page_source


class LoginUserTest(SetBrowserTests):
    def setUp(self):
        self.user = create_test_user()
        super(LoginUserTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(LoginUserTest, self).tearDown()

    def test_login_form(self):
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url)
        login_button = wait_for_element(selenium, EC.element_to_be_clickable(
                (By.CSS_SELECTOR, '.button_login-link')))

        login_button.click()

        selenium.save_screenshot('./screenshots/login_page_1.png')

        # Find Fields
        email_field = wait_for_element(selenium, EC.element_to_be_clickable(
            (By.ID, 'textfield-Email')))
        password = selenium.find_element_by_id("textfield-Password")

        # Click Button to check for empty values and check
        selenium.find_element_by_css_selector(
                '.button_submit-login-form').click()
        selenium.save_screenshot('./screenshots/login_page_2_invalid.png')
        # assert 'Email isn\'t valid' in selenium.page_source
        #assert 'Passwords is blank' in selenium.page_source

        # Fill out inputs and check for form valid
        email_field.send_keys("test@user.com")
        password.send_keys("top_secret")
        selenium.save_screenshot('./screenshots/login_page_3_now_valid.png')
        assert 'Email isn\'t valid' not in selenium.page_source
        assert 'Passwords is blank' not in selenium.page_source

        css_selector(selenium, '.button_submit-login-form').click()

        wait_for_element(selenium, EC.visibility_of_element_located(
            (By.XPATH, "//h1[text()='Dashboard']")))
        selenium.save_screenshot(
            './screenshots/login_page_4_redirected_to_profile.png')
        assert 'Dashboard' in selenium.page_source


class JwtTokenExpiredTest(SetBrowserTests):
    """Expired tokens should log user out"""

    def setUp(self):
        self.user = create_test_user()
        super(JwtTokenExpiredTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(JwtTokenExpiredTest, self).tearDown()

    @override_settings(JWT_EXPIRATION_DELTA=datetime.timedelta(seconds=3))
    def test_login_form(self):
        selenium = self.login_selenium_user(self)
        import time
        time.sleep(3)


        css_selector(selenium, '.button_profile-link').click()

        wait_for_element(
                selenium, EC.invisibility_of_element_located(
                        (By.XPATH, "//h1[text()='Dashboard']")))

        css_selector(selenium, '.button_sign-up-link')
