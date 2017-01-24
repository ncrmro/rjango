/* eslint-disable global-require */
import React from "react";


export default class Dashboard extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        {this.props.viewer.username}
        <br/>
        {this.props.viewer.email}
        <p>This is the dashboard</p>
      </div>
    );
  }
}
