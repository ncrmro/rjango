'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');


let appEntry;
let devtool;
let plugins;
let publicPath;


const favIcon = new FaviconsWebpackPlugin('./fend/src/client/assets/logo.png');

const stats = new BundleTracker(
    {
        path: __dirname,
        filename: './bend/static/webpack-stats.json',
        indent: true
    });

if (process.env.NODE_ENV === 'production') {
    appEntry = [path.join(__dirname, '/fend/src/client/index.js')];
    devtool = 'source-map';
    publicPath = '/static/bundles/';
    plugins = [
        stats,
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        favIcon
    ];
} else {
    appEntry = [
        path.join(__dirname, '/fend/src/client/index.js'),
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server'
    ];
    publicPath = 'http://localhost:3000/assets/bundles/'; // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
    devtool = 'eval';
    plugins = [
        stats,
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true
        }),
        favIcon
    ];
}

module.exports = {
        entry: {
            app: appEntry,
            vendor: ['react', 'react-dom', 'react-mdl', 'react-relay', 'react-router', 'react-router-relay']
        },
        output: {
            path: path.join(__dirname, 'bend', 'static', 'bundles'),
            filename: "[name]-[hash].js",
            publicPath: publicPath
        },
        devtool,
        module: {
            loaders: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loaders: ['style', 'css']
            }, {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1' +
                    '&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000&name=assets/[hash].[ext]'
            }]
        },
        postcss: () = > [precss, autoprefixer],
    plugins;
}
