## Prod

### Docker
Sample docker-compose.yml and dockerfile are enough to test out the nginx/database/staticfiles

Base image is alpine and after dependencies and staticfiles weighs in at 130.5mb

docker run -it --entrypoint=/bin/bash ncrmro/reango
docker exec -i -t reango bash

#### Docker Compose
```
docker-compose build
docker-compose up
docker-compose run reango manage.py migrate
docker-compose run reango manage.py createsuperuser
```

### Heroku
A fresh dyno will need the following ran

Clear existing buildpacks and set the python and nodejs buildpacks. This will handle installing pip and npm installs. Npm host post install generate grapqhl schema and build frontend.
`heroku buildpacks:clear`
`heroku buildpacks:set heroku/python`
`heroku buildpacks:set heroku/nodejs`
Generate a secrete key and set allowed host if need be.
`python -c 'import random; import string; print("".join([random.SystemRandom().choice(string.digits + string.ascii_letters + string.punctuation) for i in range(100)]))'`
`heroku config:set ALLOWED_HOSTS=['*'] DJANGO_SETTINGS_MODULE='reango.settings.prod' SECRET_KEY=_generate_key`
Get logs
`heroku logs --app reango-dev`
Run manage.py commands
`heroku run --app APP bash`
`python manage.py migrate`
`python manage.py createsuperuser`