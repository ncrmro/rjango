import React, { Component } from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link } from '../utils/Router'
import { logoutViewer } from '../utils/Jwt'
import { withRouter } from 'react-router-native'
const AuthNav = () =>
  <View style={styles.nav} >
    <Link to="/signup" children="Sign Up"/>
    <Link to="/login" children="Log In"/>
  </View>

const UnAuthenticatedLinks = (props) =>
  <View style={styles.nav} >
    <Link to="/" children="Home"/>
    <Link to="/polls" children="Polls"/>
    <TouchableOpacity onPress={() => logoutViewer(props.signout)} >
      <Text>Signout</Text>
    </TouchableOpacity>
  </View>

class Nav extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <UnAuthenticatedLinks {...this.props}/>
    }
    else {
      return <AuthNav {...this.props}/>
    }
  }
}


const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  subNavItem: {
    padding: 5
  }
})

export default Nav