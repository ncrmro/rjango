import React, { Component } from 'react'
import { MemoryRouter, Route, Router, Switch } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import { Link as LinkNative } from 'react-router-native'
import { Link as LinkDom } from 'react-router-dom'
import { Platform } from 'react-native'

let history = createMemoryHistory
let Link = LinkNative

if (Platform.OS === 'web') {
  history = createBrowserHistory
  Link = LinkDom
}
history = history()

//Link = props => <Link to={props.to} >{props.text}</Link>

export { history, Link, Route }
export default Router