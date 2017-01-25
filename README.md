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

source ~/.virtualenvs/ango/bin/activate

pip3 install -r ./deps/dev.txt


## Prod

### Docker
Sample docker-compose.yml and dockerfile are enough to test out the nginx/database/staticfiles

Base image is alpine and after dependencies and staticfiles weighs in at 130.5mb

You can tell if nginx is picking up the default vhost config by changing if static files are logged in the /deps/nginx/default_conf


Docker deployment should not be considered secure yet until the docker socket is moved to it's own container for nginx-gen and letsencrypt support..
Wait for the docker-compose.prod.yml


#### Docker Compose
```
docker-compose build
docker-compose up
docker-compose run ango manage.py migrate
docker-compose run ango manage.py createsuperuser

```

### Heroku
A fresh dyno will need the following ran
`heroku run --app APP bash`
`python manage.py migrate`
`python manage.py createsuperuser`

### Front-End originally based on the awesome Relay Fullstack
https://github.com/lvarayut/relay-fullstack
