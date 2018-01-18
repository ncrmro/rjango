import express from 'express'
import webpack from 'webpack'
import webpackSettings from './webpack.config.dev'
import middleware from 'webpack-dev-middleware'
import history from 'connect-history-api-fallback'
import hotMiddleware from 'webpack-hot-middleware'
import proxy from 'http-proxy-middleware'
const compiler = webpack(webpackSettings)


const GRAPHQL_PORT = 6500

// Expose a GraphQL endpoint
const app = express()
app.use('/graphql', proxy({ target: 'http://localhost:5500/graphql', changeOrigin: true }))

app.use(history())

app.use(middleware(compiler, {
  // webpack-dev-middleware options
}))
app.use(hotMiddleware(compiler))


app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
))
