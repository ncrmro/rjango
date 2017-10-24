import React from 'react'
import MenuAnchor from 'react-mdc-web/lib/Menu/MenuAnchor'
import Menu from 'react-mdc-web/lib/Menu/Menu'
import MenuItem from 'react-mdc-web/lib/Menu/MenuItem'
import MenuDivider from 'react-mdc-web/lib/Menu/MenuDivider'
import Button from 'react-mdc-web/lib/Button/Button'
import styles from './Nav.scss'
import { logoutViewer } from 'modules/auth/jwtUtils'


function onClick(e, props) {
  e.preventDefault()
  props.toggleUserDropdown()
}

type UserDropDownType = {
  viewer: {
    userDropdownIsOpen: boolean,
    toggleUserDropdown: Function,
    pushRoute: Function,
    user: {
      username?: string,
      email?: string,
    }
  }
}

let UserDropDown = (props: UserDropDownType) =>
  <div>
    <Button
      onClick={ e => onClick(e, props)}
      className='button_open-user-dropdown'
    >
      {props.viewer.user.username || props.viewer.user.email}
    </Button>

    <MenuAnchor className={styles.currentUserDropdown} >
      <Menu
        open={props.userDropdownIsOpen}
        onClose={() => props.toggleUserDropdown()}
      >
        <MenuItem
          className='button_account-link'
          onClick={e => pushRoute(e, props, '/account')}
        >
          Account
        </MenuItem>
        <MenuDivider/>
        <MenuItem
          className='button_signout-link'
          onClick={() => logoutViewer()}
        >
          Sign out
        </MenuItem>
      </Menu>
    </MenuAnchor>
  </div>

export default UserDropDown

