import React from 'react';
import styles from './Footer.scss';

const Footer = ({ title }: {title: String}) =>
  <footer className={styles.root} >
    <span>{title}</span>
  </footer>;


export default Footer;
