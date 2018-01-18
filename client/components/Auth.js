import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

import React, { Component } from 'react'
import UserSignup from '../mutations/UserSignup'
import UserLogin from '../mutations/UserLogin'
import { environment } from '../utils/Relay'
import { authenticatedRoute } from '../utils/Auth'
import Form from './Form'
const signup = '/signup'
const login = '/login'
class Auth extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      signup: props.location.pathname === signup ? true : false,
      email: '',
      password: ''
    }
  }

  signup() {
    UserSignup.commit(
      environment,
      this.state.email,
      this.state.password,
      this.props.login
    )
  }

  login() {
    UserLogin.commit(
      environment,
      this.state.email,
      this.state.password,
      this.props.login
    )
  }

  render() {
    return <View style={styles.container} >
      <Text>{this.state.signup ? 'Sign Up' : 'Login'}</Text>
        <View style={styles.fieldContainer} >
          <Text

          >
            Email
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(email) => this.setState({ email })}
            keyboardType="email-address"
            required
            value={this.state.email}
          />
        </View>
        <View style={styles.fieldContainer} >
          <Text

          >
            Password
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry

            value={this.state.password}
          />

        </View>

        <Button
          title={this.state.signIn ? 'Sign In' : 'Login'}
          onPress={() => this.state.signIn ? this.signup() : this.login()}
        />
    </View>
  }
}


const styles = StyleSheet.create({
  textInput: { height: 40, width: '100%', borderColor: 'gray', borderWidth: 1 },
  fieldContainer: {
    marginTop: 20,
    padding: 10
  },
  container: {
    width: '100%',
    marginTop: 50,
    padding: 10
  }
})

export default authenticatedRoute(Auth, false)