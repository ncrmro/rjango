# Users
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