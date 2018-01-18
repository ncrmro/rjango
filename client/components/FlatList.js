import React, { Component } from 'react'
import { FlatList as FlatListNative } from 'react-native'
import UnimplementedView from 'react-native-web/dist/modules/UnimplementedView'

let FlatList = FlatListNative
if (FlatListNative === UnimplementedView) {
  FlatList = (props) => props.data.map((item) => props.renderItem(item))
}

export default FlatList