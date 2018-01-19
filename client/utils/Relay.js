import React from 'react'
import {Text} from 'react-native'


import {ConnectionHandler, Environment, Network, Store, RecordSource} from 'relay-runtime'
import {hasValidJwtToken} from './Jwt'
import QueryLookupRenderer from 'relay-query-lookup-renderer';
//import NativeStorageSource from './NativeStorageSource'
//const source = new NativeStorageSource()
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
            return {update}
        default:
            throw new Error(`handlerProvider: No handler provided for ${handle}`)
    }
}
global.self = global;


async function fetchQuery(operation, variables) {
    const {token} = await hasValidJwtToken()
    console.log(token)
    return fetch('http://localhost:6500/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Authorization': `Bearer ${token}`,
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


export const environment = new Environment({
    handlerProvider,
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource())
})


function spreadVariables({relay, router}, variables) {
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
            render={({error, props}) => {
                if (props) {
                    return <WrappedComponent
                        { ...passedProps}
                        { ...props}
                        relay={{...passedProps.relay, environment}}
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