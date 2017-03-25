import React from 'react';
import { Link } from 'react-router';
import { Layout, Header, Navigation, Drawer } from 'react-mdl';
import styles from './Navbar.scss';


export default class Navbar extends React.Component {
  static propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    router: React.PropTypes.object.isRequired

  };

  handleSignOut() {
    localStorage.removeItem('jwtToken');
    this.props.router.push('/');
    window.location.reload();
  }

  renderLoggedIn() {
    return (
      <Navigation>
        <Link to='/' onClick={this.handleSignOut} >Sign out</Link>
        <Link to='/dashboard' >Dashboard</Link>
        <Link to='/profile' >Edit Profile</Link>
      </Navigation>
    );
  }

  renderLoggedOut() {
    return (
      <Navigation>
        <Link to='/account/signup' >Sign up</Link>
        <Link to='/account/login' >Login</Link>
      </Navigation>
    );
  }


  render() {
    const title = 'Reango';
    const { isAuthenticated } = this.props;
    return (
      <Layout className={styles.root} >
        <Header title={<Link to='/'>{title}</Link>} scroll >
          {isAuthenticated ? this.renderLoggedIn() : this.renderLoggedOut()}
        </Header>
        <Drawer
          title={<Link to='/' style={{ fontSize: '1.5em' }}>{title}</Link>}
          className='mdl-layout--small-screen-only'
        >
          {isAuthenticated ? this.renderLoggedIn() : this.renderLoggedOut()}

        </Drawer>
      </Layout>
    );
  }


}
