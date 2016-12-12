# Todos App
You may use graphiql or curl to try out some of the queries.

## Queries
The following is an example query to get the first ten todos and
return the id and text of each one.
```
query {
  allTodos(first: 10){
    edges{
      node{
        id,
        text
      }
    }
  }
}
```
The response
```
{
  "data": {
    "allTodos": {
      "edges": [
        {
          "node": {
            "id": "VG9kb05vZGU6MQ==",
            "text": "adfasdfdsa"
          }
        }
      ]
    }
  }
}
```

### Queries with Variables
```
query getSomeTodos($todos_count: Int!) {
  allTodos(first: $todos_count) {
    edges {
      node {
        id
        text
      }
    }
  }
}
```

### Using Curl
The actual post request is a json string to be careful of empty space or new lines.
Running the example query again would look like this
```
curl -XPOST -H 'Content-Type:application/graphql'  \
    -d '{ allTodos(first: 10){edges{node{id,text}}}}' \
    http://localhost:8000/graphql
```
And return the following data.
```
{"data":{"allTodos":{"edges":[{"node":{"id":"VG9kb05vZGU6MQ==","text":"adsfasdfasdfsd"}},{"node":{"id":"VG9kb05vZGU6Mg==","text":"adsfadsfa"}}]}}}

```

### Using CocoaRestClient GUI /JSON Body
This is a valid json body you can paste into the raw input of the coca rest client.
`{"query": "query {allTodos(first: 10){edges{node{id,text}}}}"}`

## Mutations


