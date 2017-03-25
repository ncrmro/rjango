/* eslint-disable no-console, no-shadow */
import path from "path";
import webpack from "webpack";
import express from "express";
import WebpackDevServer from "webpack-dev-server";
import chalk from "chalk";
import webpackConfig from "../webpack.config.js";
import config from "./config/environment";


const relayServer = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  contentBase: '/bend/static',
  proxy: {
    '/graphql': `http://localhost:${config.graphql.port}`
  },
  stats: {
    colors: true
  },
  hot: true,
  historyApiFallback: true
});

// Serve static resources
relayServer.use('/', express.static(path.join(__dirname, '../build')));
relayServer.listen(config.port, () => console.log(chalk.green(`Relay is listening on port ${config.port}`)));

