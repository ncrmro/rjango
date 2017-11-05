import os

from users.tests.helpers import SetBrowserTests
from tests.utils import css_selector

if not os.path.exists('./screenshots'):
    os.makedirs('./screenshots')


class HomePageTest(SetBrowserTests):
    def setUp(self):
        super(HomePageTest, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(HomePageTest, self).tearDown()

    def test_home_page(self):
        selenium = self.selenium
        selenium.get(self.live_server_url)
        css_selector(selenium, '.home_button')
