import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import 'normalize.css/normalize.css';
import Footer from 'components/Footer/Footer';
import Nav from '../Nav/Nav';
import styles from './App.scss';
import { isAuthenticated } from 'modules/auth/utils';
import '../../styles/global.scss';


const title = 'Reango';

let App = (props: { children: Object }) =>
  <div className={styles.root} >
    <Nav
      title={title}
      viewer={props.viewer}
      isAuthenticated={props.isAuthenticated}
      isAdmin={props.isAdmin}
    />
    <div className={styles.navBackground} />
    <div className={styles.content} >
      {props.children}
    </div>
    <Footer title={title} />
  </div>;

App = isAuthenticated(App);

export default createFragmentContainer(App, {
  viewer: graphql`
      fragment App_viewer on Viewer {
          user{
              ...UserDropDown_user
          }
      }
  ` });
