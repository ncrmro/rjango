import React from 'react'
import { Text } from 'react-native'


import { ConnectionHandler, Environment, Network, Store,RecordSource } from 'relay-runtime'
import { hasValidJwtToken } from './Jwt'
import QueryLookupRenderer from 'relay-query-lookup-renderer';
//import NativeStorageSource from './NativeStorageSource'
//const source = new NativeStorageSource()
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
async function fetchQuery(operation,
                          variables) {

  const { token } = await hasValidJwtToken()
  const authorization = token ? `Bearer ${token}` : ''
  return fetch('http://localhost:6500/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      authorization,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': true
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json()
  })
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
    <QueryLookupRenderer
      lookup
      retain
      environment={environment}
      query={query}
      variables={spreadVariables(passedProps, variables)}
      render={({ error, props }) => {
        if (props) {
          return <WrappedComponent
            { ...passedProps}
            { ...props}
            relay={{ ...passedProps.relay, environment }}
          />
        }
        else if (error) {
          return <Text> {error.toString()} </Text>
        }
        else {
          return <Text > Loading</Text>
        }
      }
      }
    />
}

export default withRelayContainer