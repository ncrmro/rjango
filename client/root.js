import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Router, { history } from 'utils/Router'
import { Route } from 'react-router'
import { AuthenticatedRoutes, UnAuthenicatedRoutes } from './components/Routes'
import Nav from './components/Nav'
import { isAuthenticated } from 'utils/Auth'
import { environment } from 'utils/Relay'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewer: {
        isAuthenticated: props.viewer.isAuthenticated
      }
    }
  }

  signout() {
    console.log('signout')
    this.setState({ viewer: { isAuthenticated: false } }, () => history.push('/login'))
  }

  login() {
    this.setState({ viewer: { isAuthenticated: true } }, () => history.push('/topics'))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ viewer: nextProps.viewer })
  }

  render() {
    console.log(environment._store._recordSource._records)
    //console.log(this.state.viewer)
    return <Router history={history} >
      <View style={styles.container} >
        <Nav
          isAuthenticated={this.state.viewer.isAuthenticated}
          signout={() => this.signout()}
        />
        <View
          style={styles.main}
        >
          <UnAuthenicatedRoutes login={() => this.login()} />
          <AuthenticatedRoutes />
        </View>
        <View
          style={styles.footer}
        >
          <Text>Footer</Text>
        </View>
      </View>
    </Router>
  }
}

export default isAuthenticated(App)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  main: {
    width: '100%',
    height: '80%',
    marginTop: 25,
    padding: 10
  },
  routes: {
    width: '100%',
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: 'center',
    fontSize: 15
  },
  footer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
