import React from 'react';
import Nav from '../Nav/Nav';
import Footer from 'components/Footer/FooterComponent';
import styles from './App.scss';
import 'normalize.css/normalize.css';
import '../../styles/global.scss';
import { createFragmentContainer, graphql } from 'react-relay';

const title = 'Reango';

const App = props =>
  <div className={styles.root} >
    <Nav title={title} isAuthenticated />
    <div className={styles.navBackground} />
    <div className={styles.content} >
      {props.children}
    </div>
    <Footer title={title} />
  </div>;


export default createFragmentContainer(App, {
  viewer: graphql`
        fragment App_viewer on Viewer {
            id
            user{
                id
                email
            }
        }
    ` });
