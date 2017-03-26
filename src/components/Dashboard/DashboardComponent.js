/* eslint-disable global-require */
import React from 'react';
import Page from '../Page/PageComponent';


export default class Dashboard extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <Page heading='Dashboard' >
        <div>
          <br />
          {this.props.viewer.user.email}
          <p>This is the dashboard</p>
        </div>
      </Page>
    );
  }
}
