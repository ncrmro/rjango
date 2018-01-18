import path from 'path'
import fs from 'fs'
const appDirectory = fs.realpathSync(process.cwd())

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath)
}


export default {
  appBuild: resolveApp('build'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('client/index.js'),
  appSrc: resolveApp('client'),
  components: resolveApp('client/components'),
  utils: resolveApp('client/utils')
}