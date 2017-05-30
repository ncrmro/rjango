import React from 'react';

const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');
import { QueryRenderer, graphql } from 'react-relay';
import RelayLookupQueryRenderer from './RelayLookupQueryRenderer';
import Loading from '../components/Loading/Loading'

const source = new RecordSource();
const store = new Store(source);

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation, variables, cacheConfig, uploadables) {
  // Caching and relay records merge here
  //console.log(operation, variables);
  // console.log(store._recordSource._records);
  return fetch('http://localhost:5500/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',

    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);



export const environment = new Environment({
  network,
  store,
});

export const RelayComponent = (passedProps) =>
  <div>
    <RelayLookupQueryRenderer
      lookup
      environment={environment}
      query={passedProps.query}
      variables={passedProps.variables}
      render={({error, props}) => props ?
      <passedProps.ChildComponent
        {...props}
        routes={passedProps.routes}
        setVariables={passedProps.setVariables}
        variables={passedProps.variables}
        environment={environment}
      />
      : <Loading /> }
    />
  </div>;