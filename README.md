# ango
The Django + GraphQL Relay backend.

Checkout Reango for a React + Relay frontend 
https://github.com/ncrmro/reango

## Features

* Relay Support
* User Registration/Sign up using JWT
* Heroku or Docker Deployment
* Docker Deployment has nginx staticfile proxy, letsencrypt csupport commming soon.

## Quick start:
You will need python 3 and node installed.
You will also need to have a virtualenv activated before running npm install/yarn or the post install build step will fail as django needs to be available to dump the graphql_schema
```
source ~/.virtualenvs/ango/bin/activate
pip3 install -r ./deps/dev.txt
yarn
```

## Prod

### Docker
Sample docker-compose.yml and dockerfile are enough to test out the nginx/database/staticfiles

Base image is alpine and after dependencies and staticfiles weighs in at 130.5mb

docker run -it --entrypoint=/bin/bash ncrmro/ango
docker exec -i -t ango bash

#### Docker Compose
```
docker-compose build
docker-compose up
docker-compose run ango manage.py migrate
docker-compose run ango manage.py createsuperuser
```

### Heroku
A fresh dyno will need the following ran

Clear existing buildpacks,
`heroku buildpacks:clear`
`heroku buildpacks:set heroku/python`
`heroku buildpacks:set heroku/nodejs`
Generate a secrete key and set allowed host if need be.
`python -c 'import random; import string; print("".join([random.SystemRandom().choice(string.digits + string.ascii_letters + string.punctuation) for i in range(100)]))'`
`heroku config:set ALLOWED_HOSTS=['*'] DJANGO_SETTINGS_MODULE='ango.settings.prod' SECRET_KEY=_generate_key`
Get logs
`heroku logs --app ango-dev`
Run manage.py commands
`heroku run --app APP bash`
`python manage.py migrate`
`python manage.py createsuperuser`

### Front-End originally based on the awesome Relay Fullstack
https://github.com/lvarayut/relay-fullstack
