import React from 'react'
import NavLink from 'react-router-dom/es/NavLink'
import Button from 'react-mdc-web/lib/Button/Button'
import UserDropDown from './UserDropDown'


type viewerType = {
  isAuthenticated: boolean,
  isAdmin: boolean,
  user: Object
}


type LinksPropType = {
  viewer: viewerType,
  userDropdownIsOpen: Boolean,
  toggleUserDropdown: Function,
  pushRoute: Function
}
export const Links = (props: LinksPropType) => {
  if (props.viewer.isAuthenticated) {
    return <UserDropDown
        key='userDropDown'
        {...props}
      />
  }
  else {
    return [
      <NavLink
        key='button_signup-link'
        className='button_signup-link'
        to='/signup'
      >
        <Button >Signup</Button>
      </NavLink>,
      <NavLink
        key='button_login-link'
        className='button_login-link'
        to='/login'
      >
        <Button >Login</Button>
      </NavLink>
    ]
  }
}


export default Links