import ClientDatabase from './ClientDatabase'
const EXISTENT = 'EXISTENT'
const NONEXISTENT = 'NONEXISTENT'
const UNKNOWN = 'UNKNOWN'


class RelayInMemoryRecordSource implements MutableRecordSource {
  constructor(records?) {
    this.dbName = 'RelaySourceDatabase'
    this.dbPromise = new ClientDatabase(this.dbName).db
    this._records = {}
    this.initStore()

  }

  clear(): void {
    this._records = {}
  }

  async getStore(transactionMode) {
    const db = await this.dbPromise
    const tx = db.transaction('RelayStore', transactionMode)
    return tx.objectStore('RelayStore')
  }

  async initStore() {
    const cb = cursor => {
      if (cursor) {
        this._records[cursor.value.dataID] = cursor.value
        cursor.continue()
      }
    }
    const store = await this.getStore()
    store.iterateCursor.call(store, cb)
  }


  async delete(dataID): void {
    this._records[dataID] = null
    const recordsStore = await this.getStore(ClientDatabase.transactionMode.readwrite)
    recordsStore.delete(dataID)
  }

  get(dataID): ?Record {
    return this._records[dataID]
  }

  getRecordIDs(): Array<DataID> {
    return Object.keys(this._records)
  }

  getStatus(dataID): RecordState {
    if (!this._records.hasOwnProperty(dataID)) {
      return UNKNOWN
    }
    return this._records[dataID] == null ? NONEXISTENT : EXISTENT
  }

  has(dataID): boolean {
    return this._records.hasOwnProperty(dataID)
  }

  load(dataID,
       callback: (error: ?Error, record: ?Record) => void): void {
    callback(null, this.get(dataID))
  }

  async remove(dataID): void {
    const recordsStore = await this.getStore(ClientDatabase.transactionMode.readwrite)
    recordsStore.delete(dataID)
    delete this._records[dataID]
  }

  async set(dataID, record: Record): void {
    this._records[dataID] = record
    const store = await this.getStore(ClientDatabase.transactionMode.readwrite)
    store.put({ ...record, dataID })
  }

  size(): number {
    return Object.keys(this._records).length
  }

  toJSON(): Object {
    return this._records
  }
}

export default RelayInMemoryRecordSource