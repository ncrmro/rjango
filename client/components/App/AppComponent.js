import React from 'react';
import 'normalize.css/normalize.css';
import '../../styles/global.scss';

import Navbar from '../Nav/Nav';
import Footer from '../Footer/FooterComponent';
import styles from './App.scss';

const App = ({ isAuthenticated, router, children }) =>
  <div className={styles.root} >
    <Navbar isAuthenticated />
    <div className={styles.navBackground} />
    <div className={styles.content} >
      {children}
    </div>
    <Footer />
  </div>;

export default App;
