import React from 'react'

import { StyleSheet, TextInput as RNTextInput } from 'react-native'

const TextInput = props =>
  <RNTextInput
    style={styles.textInput}
    {...props}
  />

const styles = StyleSheet.create({
  textInput: { height: 40, width: '100%', borderColor: 'gray', borderWidth: 1 }
})
export default TextInput