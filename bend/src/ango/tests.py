from django.test import LiveServerTestCase
from selenium import webdriver


class HomePageTest(LiveServerTestCase):
    def setUp(self):
        self.selenium = webdriver.Firefox()
        super(HomePageTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(HomePageTest, self).tearDown()

    def test_home_page(self):
        selenium = self.selenium
        selenium.implicitly_wait(10)  # seconds

        # Opening the link we want to test
        selenium.get(self.live_server_url)
        assert 'Relay Fullstack' in selenium.page_source
