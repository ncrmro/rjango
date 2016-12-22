# ango
The Django + GraphQL Relay backend.

Checkout Reango for a React + Relay frontend 
https://github.com/ncrmro/reango

## Features

* Relay Support
* User Registration/Sign up using JWT

## Quick start:

source ~/.virtualenvs/bin/activate

pip3 install -r ./deps/dev.txt


## Prod

### Docker

#### Docker Compose
```
docker-compose build
docker-compose up
docker-compose run ango migrate
docker-compose run ango createsuperuser

```

### Heroku
A fresh dyno will need the following ran
`heroku run --app APP bash`
`python manage.py migrate`
`python manage.py createsuperuser`
