import React from 'react'
import Toolbar from 'react-mdc-web/lib/Toolbar/Toolbar'
import ToolbarSection from 'react-mdc-web/lib/Toolbar/ToolbarSection'
import ToolbarTitle from 'react-mdc-web/lib/Toolbar/ToolbarTitle'
import ToolbarRow from 'react-mdc-web/lib/Toolbar/ToolbarRow'
import Button from 'react-mdc-web/lib/Button/Button'
import Icon from 'react-mdc-web/lib/Icon/Icon'
import styles from '../Nav.scss'
import { HomeLink } from '../Nav'

type MobileDrawerProps = {
  title: string,
}
const MobileFooterToolBar = (props: MobileDrawerProps) =>
  <Toolbar>
    <ToolbarRow className={styles.toolbarRow} >
      <ToolbarSection align='start' >
        <ToolbarTitle className={styles.title} >
          <HomeLink title={title} />
        </ToolbarTitle>
        <Button
          onClick={() => this.toggleMobileNav()}
        >
          <Icon
            name='menu'
            className={styles.mobileNavButton}
          />
        </Button>
      </ToolbarSection>
      <ToolbarSection align='end' style={{ overflow: 'visible' }} >
        <Links
          userDropdownIsOpen={userDropdownIsOpen}
          toggleUserDropdown={this.toggleUserDropdown.bind(this)}
          partBrowserDropdownIsOpen={partBrowserDropdownIsOpen}
          togglePartBrowserDropdown={this.togglePartBrowserDropdown.bind(this)}
          router={router}
          viewer={viewer}
        />
      </ToolbarSection>
    </ToolbarRow>
  </Toolbar>

export default MobileFooterToolBar