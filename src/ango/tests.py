from django.test import LiveServerTestCase
from django.conf import settings
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import os


if not os.path.exists('./screenshots'):
    os.makedirs('./screenshots')


class HomePageTest(LiveServerTestCase):
    def setUp(self):
        self.selenium = webdriver.Remote(
            command_executor=settings.SELENIUM_HOST,
            desired_capabilities=DesiredCapabilities.CHROME
        )
        super(HomePageTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(HomePageTest, self).tearDown()

    def test_home_page(self):
        selenium = self.selenium
        selenium.implicitly_wait(10)  # seconds
        # Opening the link we want to test
        selenium.get(self.live_server_url)
        selenium.save_screenshot('./screenshots/ff_landing.png')
        assert 'Relay Fullstack' in selenium.page_source
