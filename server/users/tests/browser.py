import datetime

from django.test import override_settings
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

from tests.utils import SetBrowserTests, wait_for_element, \
    css_selector, create_test_user, login_selenium_user


def fill_out_auth_form(
        selenium,
        password_confirm=None,
        password='test_password',
        email='sign_up_test_user@test.com',
):
    # Find Fields
    email_field = css_selector(selenium, 'input#email')
    password_field = css_selector(selenium, 'input#password')

    # Fill out inputs and check for form valid
    email_field.send_keys(email)
    password_field.send_keys(password)
    password_confirm_selector = 'input#passwordConfirmation'

    if password_confirm:
        password_confirm_field = css_selector(
                selenium,
                password_confirm_selector
        )
        password_confirm_field.send_keys(password)


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

        css_selector(selenium, '.button_signup-link').click()
        # Click Button to check for empty values
        fill_out_auth_form(
                selenium=selenium,
                password_confirm=True,
                password='',
                email=''

        )

        css_selector(selenium, '.button_submit-signup-form').click()
        css_selector(selenium, '.mdc-textfield-helptext')
        # assert 'Please fill out this field' in selenium.page_source

        # assert 'Passwords don\'t match' in selenium.page_source

        # Fill out inputs with valid fields and check for form valid
        fill_out_auth_form(selenium)

        assert 'Email isn\'t valid' not in selenium.page_source
        assert 'Passwords don\'t match' not in selenium.page_source

    def test_sign_up_form_success(self):
        selenium = self.selenium
        # Opening the link we want to test
        selenium.get(self.live_server_url)

        css_selector(selenium, '.button_signup-link').click()

        # Find Fields
        fill_out_auth_form(selenium, password_confirm=True)

        # Click Button to check for empty values and check
        css_selector(selenium, '.button_submit-signup-form').click()
        wait_for_element(selenium, EC.visibility_of_element_located(
                (By.XPATH, "//h1[text()='Polls']")))


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
        login_selenium_user(self)

        assert 'This is the polls app' in selenium.page_source


class JwtTokenExpiredTest(SetBrowserTests):
    """Expired tokens should log user out"""

    def setUp(self):
        self.user = create_test_user()
        super(JwtTokenExpiredTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(JwtTokenExpiredTest, self).tearDown()

    @override_settings(JWT_EXPIRATION_DELTA=datetime.timedelta(seconds=3))
    def test_expired_token_logs_out_user(self):
        selenium = self.login_selenium_user(self)
        import time
        time.sleep(3)

        css_selector(selenium, '.button_profile-link').click()

        wait_for_element(
                selenium, EC.invisibility_of_element_located(
                        (By.XPATH, "//h1[text()='Polls']")))

        css_selector(selenium, '.button_sign-up-link')
