import React from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import Navigation from 'react-mdc-web/lib/Drawer/Navigation';
import Drawer from 'react-mdc-web/lib/Drawer/Drawer';
import DrawerHeader from 'react-mdc-web/lib/Drawer/DrawerHeader';
import DrawerHeaderContent from 'react-mdc-web/lib/Drawer/DrawerHeaderContent';
import DrawerContent from 'react-mdc-web/lib/Drawer/DrawerContent';
import Toolbar from 'react-mdc-web/lib/Toolbar/Toolbar';
import ToolbarSection from 'react-mdc-web/lib/Toolbar/ToolbarSection';
import ToolbarTitle from 'react-mdc-web/lib/Toolbar/ToolbarTitle';
import ToolbarRow from 'react-mdc-web/lib/Toolbar/ToolbarRow';
import Button from 'react-mdc-web/lib/Button/Button';
import Icon from 'react-mdc-web/lib/Icon/Icon';
import UserProfileDropbdownButton from './UserProfileDropdownButton';
import styles from './Nav.scss';
import { logoutViewer } from 'modules/auth/jwtUtils';

type NavPropsType = { title: string, isAuthenticated: boolean, isAdmin: boolean }

const loggedInLinks = [
  { to: '/orders/buy', text: 'Market', className: 'market' },
  { to: '/dashboard', text: 'Dashboard', className: 'dashboard' },
  { to: '/parts/cpu', text: 'Parts', className: 'parts' },
  { to: '/account/profile', text: 'Profile', className: 'profile' },
  {
    to: '',
    text: 'Sign out',
    className: 'signout',

  },
];

const loggedOutLinks = [
  { to: '/account/signup', text: 'Sign Up', className: 'sign-up' },
  { to: '/account/login', text: 'Login', className: 'login' },
];


const HomeLink = ({ title }: { title: NavPropsType.title }) =>
  <NavLink to='/' >
    <Button >{title}</Button>
  </NavLink>;

const AdminLink = () =>
  <NavLink to='/admin/' >
    <Button >Admin</Button>
  </NavLink>;

type LinksPropType = { isAuthenticated: NavPropsType.isAuthenticated, isAdmin: NavPropsType.isAdmin };
const AuthenticatedLinks = (props) =>
  <div>
    <NavLink className='button_polls-link' to='/upgrades/' >
      <Button >Upgrade</Button>
    </NavLink>
    {props.isAdmin ? <AdminLink /> : null}
    <UserProfileDropbdownButton
      userDropdownIsOpen={props.userDropdownIsOpen}
      handleUserDropdown={props.handleUserDropdown}
      signoutViewer={() => logoutViewer()}
      user={props.viewer.user}
      router={props.router}
    />
  </div>;

const NonAuthenticatedLinks = () =>
  <div>
    <NavLink className='button_signup-link' to='/signup' >
      <Button >Signup</Button>
    </NavLink>
    <NavLink className='button_login-link' to='/login' >
      <Button >Login</Button>
    </NavLink>
  </div>;

const Links = (props: LinksPropType) =>
  <div>
    {props.isAuthenticated ?
      <AuthenticatedLinks
        userDropdownIsOpen={props.userDropdownIsOpen}
        handleUserDropdown={props.handleUserDropdown}
        router={props.router}
        // overide messes with style for now
        viewer={props.viewer}
        isAdmin={props.isAdmin}
      /> :
      <NonAuthenticatedLinks />
    }
  </div>;

const MobileDrawer = (props: NavPropsType) =>
  <Drawer
    {...props}
  >
    <DrawerHeader>

      <DrawerHeaderContent>
        <HomeLink className='button_home-link' title={props.title} />
      </DrawerHeaderContent>
    </DrawerHeader>
    <DrawerContent>
      <Navigation>
        <props.children />
      </Navigation>
    </DrawerContent>
  </Drawer>;

class Nav extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      navIsOpen: false,
      userDropdownIsOpen: false
    };
  }

  state: { navIsOpen: boolean };
  props: NavPropsType;

  handleUserDropdown(open = true) {
    this.setState({ userDropdownIsOpen: open } )}


  render() {
    const { isAuthenticated, isAdmin, title, router, routes, viewer } = this.props;
    const { userDropdownIsOpen } = this.state;

    return (
      <div >
        <Toolbar>
          <ToolbarRow className={styles.toolbarRow} >
            <ToolbarSection align='start' >
              <ToolbarTitle className={styles.title} >
                <HomeLink title={title} />
              </ToolbarTitle>
              <Button
                onClick={() => {
                  this.setState({ navIsOpen: !this.state.navIsOpen });
                }}
              >
                <Icon
                  name='menu'
                  className={styles.mobileNavButton}
                />
              </Button>
            </ToolbarSection>
            <ToolbarSection align='end' style={{overflow: 'visible'}}>
              <Links
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                userDropdownIsOpen={userDropdownIsOpen}
                handleUserDropdown={this.handleUserDropdown.bind(this)}
                router={router}
                viewer={viewer}
              />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        {this.state.navIsOpen ?
          <MobileDrawer
            open
            onClose={() => {
              this.setState({ navIsOpen: false });
            }}
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}

          >
            <Links
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              userDropdownIsOpen={userDropdownIsOpen}
              handleUserDropdown={() => this.handleUserDropdown}
              router={router}
            />
          </MobileDrawer> : null
        }

      </div>
    );
  }


}

export default Nav