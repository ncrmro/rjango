import React from 'react';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';

import Navbar from '../Navbar/NavbarComponent';
import Footer from '../Footer/FooterContainer';
import styles from './App.scss';
import isAuthenticatedComponent from '../../apps/users/components/isAuthenticated/isAuthenticatedComponent';


class App extends React.Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    children: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired
  };


  render() {
    const { isAuthenticated, viewer, router, children } = this.props;


    return (
      <div className={styles.root}>
        <Navbar isAuthenticated={isAuthenticated} router={router} />
        <div className={styles.navBackground} />
        <div className={styles.content}>
          {children}
        </div>
                /<Footer viewer={viewer} />
      </div>
    );
  }
}

export default isAuthenticatedComponent(App);
