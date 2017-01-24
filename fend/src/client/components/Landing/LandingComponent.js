/* eslint-disable global-require */
import React from "react";


export default class Landing extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <p>This is the landing page</p>
      </div>
    );
  }
}
