import React from "react";
import {Link} from "react-router";
import {Layout, Header, Navigation, Drawer} from "react-mdl";
import styles from "./Navbar.scss";

export default class Navbar extends React.Component {
  static propTypes = {
    userLoggedIn: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    const title = 'Relay Fullstack';
    return (
      <Layout className={styles.root}>
        <Header title={<Link to='/'>{title}</Link>} scroll>
          {this.props.userLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut()}
        </Header>
        <Drawer title={<Link to='/' style={{ fontSize: '1.5em' }}>{title}</Link>}
                className='mdl-layout--small-screen-only'>
          <Navigation>
            <Link to='/signup'>Sign up</Link>
            <Link to='/login'>Login</Link>
            <Link to='/dashboard'>Dashboard</Link>
          </Navigation>
        </Drawer>
      </Layout>
    );
  }

  renderLoggedIn() {
    return (
      <Navigation>
        <Link to='/signout'>Sign out</Link>
        <Link to='/dashboard'>Dashboard</Link>

      </Navigation>
    );
  }

  renderLoggedOut() {
    return (
      <Navigation>
        <Link to='/signup'>Sign up</Link>
        <Link to='/login'>Login</Link>
      </Navigation>
    );
  }
}
