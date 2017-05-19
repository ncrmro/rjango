import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, Navigation, Drawer } from 'react-mdl';
import styles from './Nav.scss';

const title = 'Reango';

const Nav = () =>
  <Layout className={styles.root} >
    <Header title={<Link to='/'>{title}</Link>} scroll >
      <Navigation>
      <Link to='/' >Sign out</Link>
      <Link to='/todos' >Todos Example</Link>
      <Link to='/dashboard' >Dashboard</Link>
      <Link to='/account/profile' >Edit Profile</Link>
    </Navigation>
    </Header>
    <Drawer
      title={<Link to='/' style={{ fontSize: '1.5em' }}>{title}</Link>}
      className='mdl-layout--small-screen-only'
    >
      <Navigation>
      <Link to='/' >Sign out</Link>
      <Link to='/todos' >Todos Example</Link>
      <Link to='/dashboard' >Dashboard</Link>
      <Link to='/account/profile' >Edit Profile</Link>
    </Navigation>

    </Drawer>
  </Layout>;

export default Nav;
