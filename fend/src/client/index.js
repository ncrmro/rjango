import React from "react";
import Relay from "react-relay";
import ReactDOM from "react-dom";
import {browserHistory, applyRouterMiddleware, Router} from "react-router";
import useRelay from "react-router-relay";
import Routes from "./routes/index";
import "../../../node_modules/react-mdl/extra/material";
import jwtToken from "./utils/jwt_token"

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    headers: {
      Authorization: 'Bearer ' + jwtToken()
    }
  })
);

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

ReactDOM.render(
  <Router history={browserHistory} routes={Routes()} render={applyRouterMiddleware(useRelay)}
          environment={Relay.Store}/>,
  rootNode
);
