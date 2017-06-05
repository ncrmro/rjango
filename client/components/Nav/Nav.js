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
import styles from './Nav.scss';
import { logoutViewer } from 'modules/auth/jwtUtils';

type NavPropsType = { title: string, isAuthenticated: boolean, isAdmin: boolean }

const HomeLink = ({ title }: { title: NavPropsType.title }) =>
  <NavLink to='/' >
    <Button >{title}</Button>
  </NavLink>;

const AdminLink = () =>
  <NavLink to='/admin/' >
    <Button >Admin</Button>
  </NavLink>;

type LinksPropType = { isAuthenticated: NavPropsType.isAuthenticated, isAdmin: NavPropsType.isAdmin };

const links = (props: LinksPropType) => {
  let NavLinks;
  if (props.isAuthenticated) {
    NavLinks = () =>
      <div>
        <NavLink className='button_polls-link' to='/polls' >
          <Button >Polls</Button>
        </NavLink>
        {props.isAdmin ? <AdminLink /> : null}
        <NavLink className='button_signout-link' to='#' >
          <Button onClick={() => logoutViewer()} >Sign out</Button>
        </NavLink>
      </div>;
  }
  if (!props.isAuthenticated) {
    NavLinks = () =>
      <div>
        <NavLink className='button_signup-link' to='/signup' >
          <Button >Signup</Button>
        </NavLink>
        <NavLink className='button_login-link' to='/login' >
          <Button >Login</Button>
        </NavLink>
      </div>;
  }


  return NavLinks;
};

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
        <props.Links
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
        />
      </Navigation>
    </DrawerContent>
  </Drawer>;

class Nav extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = { isOpen: false };
  }

  state: { isOpen: boolean };
  props: NavPropsType;

  render() {
    const { isAuthenticated, isAdmin, title } = this.props;
    const Links = links({ isAuthenticated, isAdmin, title });

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
                  this.setState({ isOpen: !this.state.isOpen });
                }}
              >
                <Icon
                  name='menu'
                  className={styles.mobileNavButton}
                />
              </Button>
            </ToolbarSection>
            <ToolbarSection align='end' >
              <Links
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
              />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>

        <MobileDrawer
          open={this.state.isOpen}
          onClose={() => {
            this.setState({ isOpen: false });
          }}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          Links={Links}
        />

      </div>
    );
  }


}

export default Nav;
