# Users





mutation{
  createToken(input:{email:"admin@test.com", password: "test_password"}){
    tokens{
      __typename
      ... on TokensSuccess{
        jwtAccessToken,
        jwtRefreshToken
      }
      ... on TokenError{
        error
      }
    }
  }
}

query($jwtToken: String!){
  viewerWithToken(jwtToken: $jwtToken) {
    user {
      email
    }
  }
}





```
query {
  allUsers(first:10){
    edges{
      node{
        username,
        firstName,
        lastName,
        todomodel(first:10){
          edges{
            node {
              text
            }
          }
        }
      }
    }
  }
}
```

```
query {
  currentUser{
    id,
    username,
    isAnonymous,
    isAuthenticated,
    isStaff
    isActive
  }
}
```

```
{
  "data": {
    "allUsers": {
      "edges": [
        {
          "node": {
            "id": "VXNlck5vZGU6MQ==",
            "username": "ncrmro",
            "email": "ncrmro@gmail.com",
            "firstName": "",
            "lastName": "",
            "isActive": true,
            "isStaff": true,
            "password": "pbkdf2_sha256$30000$8TGiqFDuKbvY$dS7g8y3CLkgkf9cLPQPSREwyEzykfDAIUQ5+ypVPnyY=",
            "todomodel": {
              "edges": [
                {
                  "node": {
                    "id": "VG9kb05vZGU6MQ==",
                    "text": "adsfasdfasdfsd"
                  }
                },
                {
                  "node": {
                    "id": "VG9kb05vZGU6Mg==",
                    "text": "adsfadsfa"
                  }
                }
              ]
            }
          }
        }
      ]
    }
  }
}
```

```
mutation {
  login_user(input: {username: "ncrmro", password: "testpassword"}) {
    viewer {
      username
      email
      todomodel(first: 2) {
        edges {
          node {
            text
          }
        }
      }
    }
    jwtToken
  }
}



query {
  login(username:"ncrmro", password: "testpassword") {
    viewer{
      username,
      dateJoined
    },
    jwtToken
  }
}

query {viewer(jwtToken: ""){
  viewer {
    username,
    isAuthenticated,
    isAnonymous
  }
}}


```

```
{"input_0": {"username": "ncrmro", "password": "testpassword"}}

mutation LoginUserMutation($input_0:LogInUserInput!) {
  login_user(input:$input_0) {
    clientMutationId,
    ...F0
  }
}
fragment F0 on LogInUserPayload {
  viewer {
    username,
    id
  }
}

{
  "data": {
    "login_user": {
      "clientMutationId": null,
      "viewer": {
        "id": "VXNlck5vZGU6MQ=="
      }
    }
  }
}
```