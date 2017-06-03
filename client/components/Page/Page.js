import React from 'react';
import styles from './Page.scss';

const Page = props =>
  <div className={styles.root}>
    <h1 className={styles.heading} >
      {props.heading}
    </h1>
    <hr />
    <div className={styles.body}>
      {props.children}
    </div>
  </div>;

export default Page;
