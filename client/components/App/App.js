import React from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/FooterComponent';
import styles from './App.scss';
import 'normalize.css/normalize.css';
import '../../styles/global.scss';

const App = ({ children, router, route, environment, renderSubRoutes }) =>
  <div className={styles.root} >
    <Nav isAuthenticated  />
    <div className={styles.navBackground} />
    <div className={styles.content} >
      {children}
    </div>
    <Footer />
  </div>;

export default App;
