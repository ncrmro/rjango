import React from 'react'
import { hasValidJwtToken } from 'modules/auth/jwtUtils'
import Loading from '../components/Loading/Loading'

import { QueryRenderer } from 'react-relay'

import {
  ConnectionHandler,
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime'

const source = new RecordSource()
const store = new Store(source)

function update(store, payload) {
  const record = store.get(payload.dataID)
  if (!record) {
    return
  }
  const serverViewer = record.getLinkedRecord(payload.fieldKey)
  record.setLinkedRecord(serverViewer, payload.handleKey)

  const root = store.getRoot()
  root.setLinkedRecord(serverViewer, payload.handleKey)
}

function handlerProvider(handle) {
  //https://github.com/facebook/relay/issues/1668#issuecomment-298828818
  switch (handle) {
    // Augment (or remove from) this list:
    case 'connection':
      return ConnectionHandler
    case 'viewer':
      return { update }
    default:
      throw new Error(`handlerProvider: No handler provided for ${handle}`)
  }
}
// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation, variables/* , cacheConfig, uploadables*/) {
  // Caching and relay records merge here
  // console.log(operation, variables);
  // console.log(store._recordSource._records);
  const { token } = hasValidJwtToken()
  const authorization = token ? `Bearer ${token}` : ''
  return fetch('/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  }).then(response => response.json())
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery)


export const environment = new Environment({
  handlerProvider,
  network,
  store
})


function spreadVariables({ relay, router }, variables) {
  let nextVar = {
    // Variables passed withRelayContainer
    ...variables
  }
  if (router) {
    nextVar = {
      ...nextVar,
      // Any url params found in the url eg /questions?first=10
      ...router.urlParams,
      // React router match params eg /question/1 = /question/:id
      ...router.match.params
    }
  }
  if (relay && relay.variables) {
    // Passing a relay variables object allows us to pass down variables from components higher up
    nextVar = {
      ...nextVar,
      ...relay.variables
    }
  }
  return nextVar
}

export function withRelayContainer(WrappedComponent, query, variables = {}) {
  return (passedProps) =>
    <QueryRenderer
      environment={environment}
      query={query}
      variables={spreadVariables(passedProps, variables)}
      render={({ error, props }) => {
        if (props) {
          const viewerProps = { viewer: { ...passedProps.viewer, ...props.viewer } }
          return <WrappedComponent
            { ...passedProps}
            { ...props}
            { ...viewerProps}
            relay={{ ...passedProps.relay, environment }}
          />
        }
        else if (error) {
          return <div> {error} </div>
        }
        else {
          return <Loading />
        }

      }
      }
    />
}

export default withRelayContainer