# reango
The Django + GraphQL Relay Modern backend.


## Features

* Relay Support
* User Registration/Sign up using JWT
* Heroku or Docker Deployment

## Quick start:
You will need python 3 and node installed.
You will also need to have a virtualenv activated before running npm install/yarn or the post install build step will fail as django needs to be available to dump the graphql_schema
```
source ~/.virtualenvs/reango/bin/activate
pip3 install -r ./deps/dev.txt
yarn
```

## Prod

See readme in `./lib/deployment`

### Front-End originally based on the awesome Relay Fullstack
https://github.com/lvarayut/relay-fullstack
