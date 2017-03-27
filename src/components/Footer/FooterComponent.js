import React from 'react';
import { Footer as MDLFooter, FooterSection } from 'react-mdl';
import styles from './Footer.scss';

const Footer = () => <MDLFooter className={styles.root} size='mini' >
  <FooterSection type='middle' >
    <span>Reango</span>
  </FooterSection>
</MDLFooter>;
export default Footer;
