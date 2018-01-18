import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import paths from './paths'

const publicPath = '/'

export default {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: publicPath
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-router-native': 'react-router-dom',
      components: paths.components,
      utils: paths.utils
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    hot: true
  },
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)(\?.*)?$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        include: paths.appSrc
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }

      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
