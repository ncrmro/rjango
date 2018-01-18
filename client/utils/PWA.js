import * as OfflinePluginRuntime from 'offline-plugin/runtime'

const OfflineConfig = {
  onInstalled: function () {
    console.log('onInstalled')
  },

  onUpdating: function () {
    console.log('onUpdating')
  },

  onUpdateReady: function () {
    console.log('onUpdateReady')
    OfflinePluginRuntime.applyUpdate()
  },
  onUpdated: function () {
    console.log('onUpdated')
    window.location.reload()
  }
}
export { OfflinePluginRuntime, OfflineConfig }