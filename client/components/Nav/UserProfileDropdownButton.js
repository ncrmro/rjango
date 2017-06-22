import React from 'react'
import { createFragmentContainer } from 'react-relay'
import MenuAnchor from 'react-mdc-web/lib/Menu/MenuAnchor'
import Menu from 'react-mdc-web/lib/Menu/Menu'
import MenuItem from 'react-mdc-web/lib/Menu/MenuItem'
import MenuDivider from 'react-mdc-web/lib/Menu/MenuDivider'
import Button from 'react-mdc-web/lib/Button/Button'
import NavLink from 'react-router-dom/es/NavLink'
import styles from './Nav.scss'


const UserProfileDropDownButton = (props) =>
  <NavLink to="" >
    <Button
      onClick={ e => {
        e.preventDefault(), props.handleUserDropdown(true)
      }}
    >
      {props.user.username || props.user.email}
    </Button>

    <MenuAnchor className={styles.currentUserDropdown} >
      <Menu
        open={props.userDropdownIsOpen}
        onClose={() => props.handleUserDropdown(false)}
      >
        <MenuItem
          onClick={e => {
            e.preventDefault()
            props.router.history.push('/account')
          }}
        >
          Account
        </MenuItem>
        <MenuDivider/>
        <MenuItem
          className='button_signout-link'
          onClick={() => props.signoutViewer()}
        >
          Sign out
        </MenuItem>
      </Menu>
    </MenuAnchor>
  </NavLink>


export default createFragmentContainer(UserProfileDropDownButton, {
    user: graphql`
       fragment UserProfileDropdownButton_user on UserNode {
           username
           email
    }
    `
  }
)

