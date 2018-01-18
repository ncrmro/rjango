import React, { Component } from 'react'

export default class Forms extends Component{
  render() {
    return <form> {this.props.children} </form>
  }
}