import React from 'react';
import styles from './Page.scss';

export default class Feature extends React.Component {
  render() {
    return (
      <div>
        <h1 className={styles.heading}>
          {this.props.heading}
        </h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
