FROM ubuntu:16.04

ENV INSTALL_PATH=/ango \
    BUILD_PACKAGES="apt-transport-https python-software-properties" \
    DJANGO_SETTINGS_MODULE=ango.settings.prod \
    SECRET_KEY=000000000000000 \
    DATABASE_URL=sqlite:////src/db.sqlite3 \
    ALLOWED_HOSTS=['*']

WORKDIR $INSTALL_PATH

# Get ubuntu, python, nodejs and yarn set up
RUN apt-get update \
    && apt-get install -y $BUILD_PACKAGES curl python3 python3-pip libpq-dev python3-dev \
    && curl -sL https://deb.nodesource.com/setup_6.x | bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y nodejs \
    && apt-get install -y yarn \
    && apt-get remove --purge -y $BUILD_PACKAGES \
    && rm -rf /var/lib/apt/lists/*
# Copy python requirements these layers only get ran if anything changes.
COPY ./requirements.txt $INSTALL_PATH

COPY ./deps/ $INSTALL_PATH/deps

RUN pip3 install -r $INSTALL_PATH/requirements.txt -r ./deps/dev.txt

COPY . $INSTALL_PATH

RUN yarn \
    && python3 ./manage.py collectstatic --no-input \
    && rm -rf ./node_modules

EXPOSE 8000

ENTRYPOINT ["python3", "-u"]