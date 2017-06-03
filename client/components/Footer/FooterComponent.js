import React from 'react';
import styles from './Footer.scss';

const Footer = ({ title }) =>
  <footer className={styles.root} >
    <span>{title}</span>
  </footer>;


export default Footer;
