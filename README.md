# reango
The Django + GraphQL Relay Modern backend.


## Features

* Relay Support
* User Registration/Sign up using JWT
* Postgres as a first class database, making use of Trigram Full Text Search Extension
* Heroku or Docker Deployment

## Quick start:
You will need python 3, postgres and node installed.
You will also need to have a virtualenv activated before running npm install/yarn or the post install build step will fail as django needs to be available to dump the graphql_schema
```
source ~/.virtualenvs/reango/bin/activate
cp .env.sample .env
pip3 install -r ./lib/deps/dev.txt
yarn
```

### Database setup
- Login to postgres user using:

    `$ sudo -u postgres psql`

- Create a user "reango" with superuser and createdb ability:

    `# create user reango with superuser createdb password 'password here';`

- Create a database named reango:

    `# create database reango;`

- Open `.env` file in the reango project and add the password your supplied for the 'reango' role/user:

    `DATABASE_URL=postgres://reango:<password here>@127.0.0.1:5432/reango`




## Getting started
Define a django model, register the node and query with in the ./server/reango/schema.py

To work with the client side, add a route in the ./client/routes

Reusable components go in ./client/components, 
If you'd like you can split of django apps into there own folders in the 
./client/modules like the django apps concept

## Staging Data
Factories should be used to generate the staging data during tests as well and in the development environment.

A single django managment command should be available to get everything staged initial.

This command should be composed of smaller commands defined in each django app's management folder. This way you can delete a single users object and regenerate or generate multiple for each users.

`python3 manage.py stagedata`

## Prod

See readme in `./lib/deployment`

### Front-End originally based on the awesome Relay Fullstack
https://github.com/lvarayut/relay-fullstack
