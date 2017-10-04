// @flow
import React from 'react'
import NavLink from 'react-router-dom/es/NavLink'
import Toolbar from 'react-mdc-web/lib/Toolbar/Toolbar'
import ToolbarSection from 'react-mdc-web/lib/Toolbar/ToolbarSection'
import ToolbarTitle from 'react-mdc-web/lib/Toolbar/ToolbarTitle'
import ToolbarRow from 'react-mdc-web/lib/Toolbar/ToolbarRow'
import Button from 'react-mdc-web/lib/Button/Button'
import Icon from 'react-mdc-web/lib/Icon/Icon'
import UserDropDown from './UserDropDown'
import { logoutViewer } from 'modules/auth/jwtUtils'
import MobileDrawer from './MobileDrawer'
import styles from './Nav.scss'

const HomeLink = ({ title }: { title: NavPropsType.title }) =>
  <NavLink to='/' >
    <Button
    >
      {title}
    </Button>
  </NavLink>


type viewerType = {
  isAuthenticated: boolean,
  isAdmin: boolean,
  user: Object
}
const NonAuthenticatedLinks = () =>
  <div>
    <NavLink className='button_signup-link' to='/signup' >
      <Button >Signup</Button>
    </NavLink>
    <NavLink className='button_login-link' to='/login' >
      <Button >Login</Button>
    </NavLink>
  </div>

/*<NavLink className='button_upgrades-link' to='/upgrades/' >
 <Button >Upgrade</Button>
 </NavLink>
 */
const AuthenticatedLinks = (props) =>
  <div style={{ display: 'inline-flex' }} >
    {
      props.viewer.isAdmin ?
        <NavLink className='button_admin-link' to='/admin/dashboard' >
          <Button >Admin</Button>
        </NavLink> :
        null
    }

    <UserDropDown
      userDropdownIsOpen={props.userDropdownIsOpen}
      toggleUserDropdown={props.toggleUserDropdown}
      signoutViewer={() => logoutViewer()}
      user={props.viewer.user}
      router={props.router}
    />
  </div>

type LinksPropType = {
  viewer: viewerType,
  router: Object,
  mobile: Boolean,
  userDropdownIsOpen: Boolean,
  partBrowserDropdownIsOpen: Boolean,
  toggleUserDropdown: Function,
};
const Links = (props: LinksPropType) =>
  <div className={styles.rightNav} >
    {props.viewer.isAuthenticated ?
      <AuthenticatedLinks
        userDropdownIsOpen={props.userDropdownIsOpen}
        toggleUserDropdown={props.toggleUserDropdown}
        partBrowserDropdownIsOpen={props.partBrowserDropdownIsOpen}
        togglePartBrowserDropdown={props.togglePartBrowserDropdown}
        router={props.router}
        // overide messes with style for now
        viewer={props.viewer}
        mobile={props.mobile}
      /> :
      <NonAuthenticatedLinks />
    }
  </div>


type NavPropsType = {
  title: string,
  viewer: viewerType
}

type NavStateType = {
  mobileNavOpen: boolean,
  userDropdownIsOpen: boolean,
  partBrowserDropdownIsOpen: boolean
}

class Nav extends React.PureComponent {
  constructor(props: Object) {
    super(props)
    this.state = {
      mobileNavOpen: false,
      userDropdownIsOpen: false,
      partBrowserDropdownIsOpen: false
    }
  }

  state: NavStateType
  props: NavPropsType

  toggleUserDropdown() {
    this.setState({ userDropdownIsOpen: !this.state.userDropdownIsOpen })
  }

  togglePartBrowserDropdown() {
    this.setState({ partBrowserDropdownIsOpen: !this.state.partBrowserDropdownIsOpen })
  }

  toggleMobileNav() {
    this.setState({ mobileNavOpen: !this.state.mobileNavOpen })
  }


  render() {
    const { title, router, viewer } = this.props
    const { userDropdownIsOpen, partBrowserDropdownIsOpen, mobileNavOpen } = this.state

    return (
      <div className={styles.navRoot} >
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
        {mobileNavOpen ?
          <MobileDrawer
            open
            onClose={() => this.toggleMobileNav()}
            title={title}
          >
            <Links
              userDropdownIsOpen={userDropdownIsOpen}
              toggleUserDropdown={() => this.toggleUserDropdown}
              viewer={viewer}
              router={router}
              mobile
            />
          </MobileDrawer> : null
        }
      </div>
    )
  }


}

export default Nav
