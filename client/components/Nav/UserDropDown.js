import React from 'react'
import MenuAnchor from 'react-mdc-web/lib/Menu/MenuAnchor'
import Menu from 'react-mdc-web/lib/Menu/Menu'
import MenuItem from 'react-mdc-web/lib/Menu/MenuItem'
import MenuDivider from 'react-mdc-web/lib/Menu/MenuDivider'
import Button from 'react-mdc-web/lib/Button/Button'
import styles from './Nav.scss'
import { logoutViewer } from 'modules/auth/jwtUtils'

class UserDropDown extends React.Component {
  constructor(props: Object) {
    super(props)
    this.state = {
      userDropdownIsOpen: false
    }
  }

  state: NavStateType
  props: NavPropsType

  toggleUserDropdown(e) {
    e.preventDefault()
    this.setState({ userDropdownIsOpen: !this.state.userDropdownIsOpen })
  }


  render() {
    return (
      <div>
        <Button
          onClick={ e => this.toggleUserDropdown(e)}
          className='button_open-user-dropdown'
        >
          {this.props.viewer.user.username || this.props.viewer.user.email}
        </Button>

        <MenuAnchor className={styles.currentUserDropdown} >
          <Menu
            open={this.state.userDropdownIsOpen}
            onClose={() => this.toggleUserDropdown()}
          >
            <MenuItem
              className='button_account-link'
              onClick={e => pushRoute(e, this.props, '/account')}
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
    )
  }
}


export default UserDropDown

