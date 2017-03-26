import React from 'react';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';

import Navbar from '../Navbar/NavbarComponent';
import Footer from '../Footer/FooterComponent';
import styles from './App.scss';
import isAuthenticatedComponent from '../../apps/users/components/isAuthenticated/isAuthenticatedComponent';

const App = ({ isAuthenticated, router, children }) =>
  <div className={styles.root} >
    <Navbar isAuthenticated={isAuthenticated} router={router} />
    <div className={styles.navBackground} />
    <div className={styles.content} >
      {children}
    </div>
    <Footer />
  </div>;

App.propTypes = {
  router: React.PropTypes.object.isRequired,
  children: React.PropTypes.object.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired
};

export default isAuthenticatedComponent(App);
