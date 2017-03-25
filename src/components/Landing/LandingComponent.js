/* eslint-disable global-require */
import React from 'react';
import Page from '../Page/PageComponent';


export default class Landing extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <Page heading={'Landing'}>
        <p>This is the landing page</p>
      </Page>
    );
  }
}
