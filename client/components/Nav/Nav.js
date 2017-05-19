import React from 'react';
import { Link } from 'react-router-dom';
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

const title = 'Reango';

const RenderLinkButtons = (links) =>
  <div className={styles.rightNav} >
    {links.map(({ to, text, className, onClick })=>
      <Link key={ className} to={to}
            className={'button_' + className + '-link'} >
        <Button onClick={ onClick ? onClick : null} >{text}</Button>
      </Link>
    )}
  </div>;

class Nav extends React.Component {
  state:{isOpen: boolean};

  constructor(props:Object) {
    super(props);
    this.state = { isOpen: false };
  }

  render() {
    const { isAuthenticated, isAdmin }= this.props;
    return (
      <div >
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection align="start" >
              <ToolbarTitle className={styles.title} >
                <Link to="/" >
                  <Button >Reango</Button>
                </Link>
              </ToolbarTitle>
              <Button
                onClick={()=> { this.setState({isOpen: !this.state.isOpen}) }} ><Icon
                name='menu'
                className={styles.mobileNavButton}
              /></Button>
            </ToolbarSection>
            <ToolbarSection align="end" >
                <Link to="/">
                  <Button >Button</Button>
                </Link>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>

        <Drawer
          open={this.state.isOpen}
          onClose={()=> { this.setState({isOpen: false}) }}
        >
          <DrawerHeader>
            <DrawerHeaderContent>
              JTX
            </DrawerHeaderContent>
          </DrawerHeader>
          <DrawerContent>
            <Navigation>
              <Link to="/" >
                  <Button >Button</Button>
                </Link>
            </Navigation>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }


}

export default Nav;
