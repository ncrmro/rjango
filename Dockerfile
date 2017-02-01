FROM ncrmro/adbase

ENV INSTALL_PATH=/ango \
    BUILD_PACKAGES="apt-transport-https python-software-properties" \
    DJANGO_SETTINGS_MODULE=ango.settings.prod \
    SECRET_KEY=000000000000000 \
    DATABASE_URL=sqlite:////src/db.sqlite3 \
    ALLOWED_HOSTS=['*']

WORKDIR $INSTALL_PATH

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