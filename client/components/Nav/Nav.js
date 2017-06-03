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


const MobileDrawer = props =>
  <Drawer
    {...props}
  >
    <DrawerHeader>
      <DrawerHeaderContent>
        {props.title}
      </DrawerHeaderContent>
    </DrawerHeader>
    <DrawerContent>
      <Navigation>
        <NavLink to='/' >
          <Button >Button</Button>
        </NavLink>
      </Navigation>
    </DrawerContent>
  </Drawer>;

class Nav extends React.Component {
  state:{isOpen: boolean};

  constructor(props:Object) {
    super(props);
    this.state = { isOpen: false };
  }

  render() {
    const { title, routes, isAuthenticated, isAdmin } = this.props;
    return (
      <div >
        <Toolbar>
          <ToolbarRow className={styles.toolbarRow}>
            <ToolbarSection align='start' >
              <ToolbarTitle className={styles.title} >
                <NavLink to='/' >
                  <Button >{title}</Button>
                </NavLink>
              </ToolbarTitle>
              <Button
                onClick={() => { this.setState({ isOpen: !this.state.isOpen }); }}
              >
                <Icon
                  name='menu'
                  className={styles.mobileNavButton}
                />
              </Button>
            </ToolbarSection>
            <ToolbarSection align='end' >
              <NavLink to='/signup' >
                <Button >Signup</Button>
              </NavLink>
              <NavLink to='/login' >
                <Button >Login</Button>
              </NavLink>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>

        <MobileDrawer
          open={this.state.isOpen}
          onClose={() => { this.setState({ isOpen: false }); }}
        />

      </div>
    );
  }


}

export default Nav;
