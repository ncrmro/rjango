import React from "react";
import Relay from "react-relay";
import ReactDOM from "react-dom";
import "../../node_modules/react-mdl/extra/material";
import { AppContainer } from 'react-hot-loader';
import Root from './root';


let jwtToken = localStorage.getItem("jwtToken");

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    headers: {
      Authorization: 'Bearer ' + jwtToken
    }
  })
);

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
    render(Root)
  });
}