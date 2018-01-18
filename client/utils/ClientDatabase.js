import { AsyncStorage, Platform } from 'react-native'
import idb from 'idb'
import SQLite from 'react-native-sqlite-storage'
let browser = Platform.OS === 'web'
let native = Platform.OS === 'ios' || Platform.OS === 'andriod'
let db
if (browser) {
  browser = true
  db = window.indexedDB
} else {
  db = SQLite
}

class ClientDatabase {
  static transactionMode= {
    readonly:'readonly',
    readwrite:'readwrite',
    readwriteflush:'readwriteflush',
  }
  constructor(databaseName) {
    this.db = idb.open(databaseName, 1, upgradeDB => {
      upgradeDB.createObjectStore('RelayStore', { keyPath: 'dataID' })
    })
  }
}

export default ClientDatabase