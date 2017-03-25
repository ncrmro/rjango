/* eslint-disable global-require */
import React from 'react';
import Page from '../Page/PageComponent';


export default class Dashboard extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <Page heading='Dashboard'>
        {this.props.viewer.username}
        <br />
        {this.props.viewer.email}
        <p>This is the dashboard</p>
      </Page>
    );
  }
}
