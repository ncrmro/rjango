import React from 'react';
import Relay from 'react-relay';
import { RelayNetworkLayer, authMiddleware } from 'react-relay-network-layer';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './root';
import hasValidJwtToken from './modules/users/JwtUtils';


const rootNode = document.createElement('div');
document.body.appendChild(rootNode);


const render = (Component) => {
  ReactDOM.render(
    <AppContainer >
      <Component />
    </AppContainer>,
    rootNode
  );
};

render(Root);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').default;
    render(NextRoot)
  });
}
