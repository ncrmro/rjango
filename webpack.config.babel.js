import path from 'path'
import webpack from 'webpack'
import BundleTracker from 'webpack-bundle-tracker'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import dotenv from 'dotenv'

dotenv.load()

let
  env = process.env,
  devServerPort = env.WEBPACK_PORT ? env.WEBPACK_PORT : 3000,
  appEntry,
  devtool,
  plugins,
  publicPath,
  buildPath = path.join(__dirname, 'static', 'bundles'),
  statsPlugin = new BundleTracker(
    {
      path: __dirname,
      filename: 'static/webpack-stats.json',
      indent: true
    }),
  cssExtractTextPlugin = new ExtractTextPlugin({
      filename: '[name]-[hash].css',
      allChunks: true
    }
  ),
  vendorPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js'
  })

if (process.env.NODE_ENV === 'production') {
  appEntry = [path.join(__dirname, 'client/index.js')]
  devtool = 'source-map'
  publicPath = '/static/bundles/'
  plugins = [
    statsPlugin,
    vendorPlugin,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    cssExtractTextPlugin,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
} else {
  appEntry = [
    // activate HMR for React
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${devServerPort}`,
    'webpack/hot/only-dev-server',
    './client/index.js'
  ]
  publicPath = `http://localhost:${devServerPort}/assets/bundles/` // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
  devtool = 'eval'
  plugins = [
    statsPlugin,
    vendorPlugin,
    cssExtractTextPlugin,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ]
}


export default {
  entry: {
    app: appEntry,
    vendor: ['react', 'react-dom', 'react-relay', 'react-router']
  },
  output: {
    path: buildPath,
    filename: '[name]-[hash].js',
    publicPath: publicPath
  },
  devtool,
  devServer: {
    hot: true,
    port: devServerPort,
    historyApiFallback: true,
    stats: 'errors-only',
    contentBase: buildPath,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    publicPath
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      })
    }, {
      test: /\.scss$/,
      include: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'client', 'styles')],
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, 'node_modules'),
                path.join(__dirname, 'client', 'styles')
              ]
            }
          }
        ]
      })
    },
      {
        test: /\.scss$/,
        exclude: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'client', 'styles')],
        include: path.join(__dirname, 'client'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(__dirname, 'node_modules'),
                  path.join(__dirname, 'client', 'styles')
                ]
              }
            }
          ]
        })
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'assets/[hash].[ext]'
            }
          }
        ]
      }]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'client/components'),
      modules: path.resolve(__dirname, 'client/modules'),
      utils: path.resolve(__dirname, 'client/utils')
    }
  },
  plugins
}
