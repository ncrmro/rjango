import React from 'react';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';

//import Navbar from '../Nav/Nav';
import Footer from '../Footer/FooterComponent';
import styles from './App.scss';
import isAuthenticatedComponent from '../../modules/users/isAuthenticated/isAuthenticatedComponent';

const App = ({ isAuthenticated, router, children }) =>
  <div className={styles.root} >

    <div className={styles.navBackground} />
    <div className={styles.content} >
      {children}
    </div>
    <Footer />
  </div>;

export default App;
