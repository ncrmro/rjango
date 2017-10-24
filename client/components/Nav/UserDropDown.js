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
      dropDownOpen: false
    }
  }

  state: NavStateType
  props: NavPropsType

  toggleDropdown(e) {
    this.setState({ dropDownOpen: !this.state.dropDownOpen })
  }

  menuItems = () => {
    const pushRoute =this.props.pushRoute
    const items = [
      <MenuItem
        key='button_account-link'
        className='button_account-link'
        onClick={e => pushRoute('/account')}
      >
        Account
      </MenuItem>

    ]
    if (this.props.viewer.isAdmin) {
      items.push(
        <MenuItem
          key='button_admin-link'
          className='button_admin-link'
          onClick={e => pushRoute('/admin/dashboard')}
        >
          Admin
        </MenuItem>
      )
    }
    items.push(
      <MenuDivider key="menu-divider" />,
      <MenuItem
        key='button_signout-link'
        className='button_signout-link'
        onClick={() => logoutViewer()}
      >
        Sign out
      </MenuItem>
    )
    return items
  }


  render() {
    return (
      <div>
        <Button
          onClick={ e => this.toggleDropdown(e)}
          className='button_open-user-dropdown'
        >
          {this.props.viewer.user.username || this.props.viewer.user.email}
        </Button>

        <MenuAnchor className={styles.currentUserDropdown} >
          <Menu
            open={this.state.dropDownOpen}
            onClose={() => this.toggleDropdown()}
          >
            {this.menuItems()}

          </Menu>
        </MenuAnchor>
      </div>
    )
  }
}


export default UserDropDown

