import React from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import Toolbar from 'react-mdc-web/lib/Toolbar/Toolbar';
import ToolbarSection from 'react-mdc-web/lib/Toolbar/ToolbarSection';
import ToolbarTitle from 'react-mdc-web/lib/Toolbar/ToolbarTitle';
import ToolbarRow from 'react-mdc-web/lib/Toolbar/ToolbarRow';
import Button from 'react-mdc-web/lib/Button/Button';
import Icon from 'react-mdc-web/lib/Icon/Icon';
import UserProfileDropbdownButton from './UserProfileDropdownButton';
import styles from './Nav.scss';
import { logoutViewer } from 'modules/auth/jwtUtils';
import MobileDrawer from './MobileDrawer';
type NavPropsType = { title: string, isAuthenticated: boolean, isAdmin: boolean }


export const HomeLink = ({ title }: { title: NavPropsType.title }) =>
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
    <NavLink className='button_polls-link' to='/polls/' >
      <Button >Polls</Button>
    </NavLink>
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
        mobile={props.mobile}
      /> :
      <NonAuthenticatedLinks />
    }
  </div>;



class Nav extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      mobileNavOpen: false,
      userDropdownIsOpen: false
    };
  }

  state: { mobileNavOpen: boolean };
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
                  this.setState({ mobileNavOpen: !this.state.mobileNavOpen });
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
        {this.state.mobileNavOpen ?
          <MobileDrawer
            open
            onClose={() => {
              this.setState({ mobileNavOpen: false });
            }}
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            title={title}
          >
            <Links
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              userDropdownIsOpen={userDropdownIsOpen}
              handleUserDropdown={() => this.handleUserDropdown}
              viewer={viewer}
              router={router}
              mobile
            />
          </MobileDrawer> : null
        }

      </div>
    );
  }


}

export default Nav