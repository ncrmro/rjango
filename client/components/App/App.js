import React from 'react';
import 'normalize.css/normalize.css';
import '../../styles/global.scss';

import Navbar from '../Nav/Nav';
import Footer from '../Footer/FooterComponent';
import styles from './App.scss';

const App = (props) =>
  <div className={styles.root} >
    {console.log(props.route.routes)}
    <Navbar isAuthenticated />
    <div className={styles.navBackground} />
    <div className={styles.content} >
      {props.renderSubRoutes({routes: props.route.routes})}
    </div>
    <Footer />
  </div>;

export default App;
