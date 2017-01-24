from django.test import LiveServerTestCase
from selenium import webdriver


class HomePageTest(LiveServerTestCase):
    def setUp(self):
        self.selenium = webdriver.Firefox()
        super(HomePageTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(HomePageTest, self).tearDown()

    def test_register(self):
        selenium = self.selenium
        selenium.implicitly_wait(10)  # seconds

        # Opening the link we want to test
        selenium.get('http://localhost:8000')

        assert 'Relay Fullstack' in selenium.page_source
