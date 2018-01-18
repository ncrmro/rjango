import React, { Component } from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link } from '../utils/Router'
import { logoutViewer } from '../utils/Jwt'
import { withRouter } from 'react-router-native'
const AuthNav = () =>
  <View style={styles.nav} >
  <Link
    to="/signup" >
    <Text>Sign Up</Text>
  </Link>
  <Link
    to="/login" >
    <Text>Log In</Text>
  </Link>

</View>
export { AuthNav }

const UnAuthenticatedLinks = (props) =>
  <View style={styles.nav} >
  <Link
    to="/" >
    <Text>Home</Text>
  </Link>
  <Link
    to="/polls" >
    <Text>Polls</Text>
  </Link>

  <TouchableOpacity
    onPress={() => logoutViewer(props.signout)}

  >
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

export default Nav

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
