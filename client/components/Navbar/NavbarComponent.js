import React from 'react';
import { Link } from 'react-router';
import { Layout, Header, Navigation, Drawer } from 'react-mdl';
import styles from './Navbar.scss';

function handleSignOut() {
  localStorage.removeItem('jwtToken');
  window.location.replace('/');
  window.location.reload();
}
function renderLoggedIn() {
  return (
    <Navigation>
      <Link to='/' onClick={handleSignOut} >Sign out</Link>
      <Link to='/todos' >Todos Example</Link>
      <Link to='/dashboard' >Dashboard</Link>
      <Link to='/account/profile' >Edit Profile</Link>
    </Navigation>
  );
}

function renderLoggedOut() {
  return (
    <Navigation>
      <Link to='/todos' >Todos Example</Link>
      <Link to='/account/signup' >Sign up</Link>
      <Link to='/account/login' >Login</Link>
    </Navigation>
  );
}

const title = 'Reango';

const NavBar = ({ isAuthenticated }) =>
  <Layout className={styles.root} >
    <Header title={<Link to='/'>{title}</Link>} scroll >
      {isAuthenticated ? renderLoggedIn() : renderLoggedOut()}
    </Header>
    <Drawer
      title={<Link to='/' style={{ fontSize: '1.5em' }}>{title}</Link>}
      className='mdl-layout--small-screen-only'
    >
      {isAuthenticated ? renderLoggedIn() : renderLoggedOut()}

    </Drawer>
  </Layout>;

NavBar.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
};
export default NavBar;
