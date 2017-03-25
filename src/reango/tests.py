import os
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

from users.tests.helpers import SetBrowserTests
from users.tests.helpers import wait_for_element

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
        wait_for_element(selenium, EC.element_to_be_clickable((By.LINK_TEXT, 'Reango')))
        selenium.save_screenshot('./screenshots/landing.png')
        assert 'Reango' in selenium.page_source
