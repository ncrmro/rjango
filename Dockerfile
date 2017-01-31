FROM ubuntu:16.04

ENV INSTALL_PATH=/adbase \
    BUILD_PACKAGES="curl wget apt-transport-https python-software-properties" \
    DJANGO_SETTINGS_MODULE=ango.settings.prod \
    SECRET_KEY=000000000000000 \
    DATABASE_URL=sqlite:////src/db.sqlite3 \
    ALLOWED_HOSTS=['*']

WORKDIR $INSTALL_PATH

COPY . $INSTALL_PATH

RUN apt-get update \
    && apt-get install -y $BUILD_PACKAGES python3 python3-pip libpq-dev python3-dev \
    && curl -sL https://deb.nodesource.com/setup_6.x | bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y nodejs \
    && apt-get install -y yarn \
    && pip3 install -r $INSTALL_PATH/requirements.txt -r ./deps/dev.txt \
    && yarn \
    && python3 ./manage.py collectstatic --no-input \
    && apt-get remove --purge -y $BUILD_PACKAGES nodejs yarn \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf ./node_modules

EXPOSE 8000

ENTRYPOINT ["python3", "-u"]