'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const postcss = require('./postcss.config');

let appEntry;
let devtool;
let plugins;
let publicPath;


const favIcon = new FaviconsWebpackPlugin('./src/client/assets/logo.png');

const stats = new BundleTracker(
    {
        path: __dirname,
        filename: '../static/webpack-stats.json',
        indent: true
    });

if (process.env.NODE_ENV === 'production') {
    appEntry = [path.join(__dirname, '../src/client/index.js')];
    devtool = 'source-map';
    publicPath = '/static/bundles/';
    plugins = [
        stats,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
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
        path.join(__dirname, '../src/client/index.js'),
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server'
    ];
    publicPath = 'http://localhost:3000/assets/bundles/'; // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
    devtool = 'eval';
    plugins = [
        stats,
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
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
        path: path.join(__dirname, '..', 'static', 'bundles'),
        filename: "[name]-[hash].js",
        publicPath: publicPath
    },
    devtool,
    module: {

        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ],
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss', plugins: () => [
                            require('precss'),
                            require('autoprefixer')
                        ]
                    }

                }
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: "assets/[hash].[ext]"
                    }
                }
            ]
        }]
    },
    plugins
};
