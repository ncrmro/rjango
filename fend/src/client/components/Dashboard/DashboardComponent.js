/* eslint-disable global-require */
import React from "react";


export default class Feature extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      < div >
      < p > This;
    is;
    the;
    dashboard < / p >
    < / div >;
  )
  }
}
