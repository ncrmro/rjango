import React from 'react'
import { hasValidJwtToken } from 'modules/auth/jwtUtils'
import RelayLookupQueryRenderer from './RelayLookupQueryRenderer'
import Loading from '../components/Loading/Loading'
import Environment from 'relay-runtime/lib/RelayModernEnvironment'
import Network from 'relay-runtime/lib/RelayNetwork'
import RecordSource from 'relay-runtime/lib/RelayInMemoryRecordSource'
import Store from 'relay-runtime/lib/RelayMarkSweepStore'


const source = new RecordSource()
const store = new Store(source)


// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation, variables/* , cacheConfig, uploadables*/) {
  // Caching and relay records merge here
  // console.log(operation, variables);
  // console.log(store._recordSource._records);
  return fetch('/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      authorization: `Bearer ${hasValidJwtToken().token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => response.json())
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery)


export const environment = new Environment({
  network,
  store,
})

const RelayChild = (passedProps, error, props) => {
  if (props) {
    return (
      <passedProps.ChildComponent
        {...props}
        routes={passedProps.routes}
        environment={environment}
      />
    )
  } else if (error) {
    return <div>Error: {error}</div>
  }
  return <Loading />
}

export const RelayComponent = passedProps =>
  <RelayLookupQueryRenderer
    lookup
    environment={environment}
    query={passedProps.query}
    variables={passedProps.variables}
    render={({ error, props }) => RelayChild(passedProps, error, props)}
  />
