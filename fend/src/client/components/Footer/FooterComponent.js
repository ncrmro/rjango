import React from "react";
import {Footer as MDLFooter, FooterSection} from "react-mdl";
import styles from "./Footer.scss";

export default class Footer extends React.Component {


  render() {
    return (
      <MDLFooter className={styles.root} size='mini'>
        <FooterSection type='middle'>
          <span>Handcrafted with ♥ by   </span>
        </FooterSection>
      </MDLFooter>
    );
  }
}
