import { AsyncStorage, Platform } from 'react-native'

let storage
let browser = Platform.OS === 'web'
if (browser) {
  browser = true
  storage = window.localStorage
} else {
  storage = AsyncStorage
}

export default class Storage {
  static storage = storage

  static async setItem(key, value) {
    let item
    if (browser) {
      item = await this.storage.setItem(key, value)
    } else {
      item = await AsyncStorage.setItem(key, value)
    }
    return item
  }

  static async getItem(key) {
    let item
    if (browser) {
      item = await this.storage.getItem(key)
    } else {
      item = await AsyncStorage.getItem(key)
    }
    return item
  }

  static async removeItem(key) {
    let item
    if (browser) {
      item = await this.storage.removeItem(key)
    } else {
      item = await AsyncStorage.removeItem(key)
    }
    return item
  }
}