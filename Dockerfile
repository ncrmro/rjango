FROM ncrmro/adbase

ENV INSTALL_PATH=/src/ \
    DJANGO_SETTINGS_MODULE=ango.settings.prod \
    SECRET_KEY=000000000000000 \
    DATABASE_URL=postgres://admin:randomTestPassword@postgres:5432/admin \
    ALLOWED_HOSTS=['*']

WORKDIR $INSTALL_PATH

COPY ./deps/ $INSTALL_PATH/deps/

COPY . $INSTALL_PATH

COPY ./deps/nginx/ /etc/nginx/vhost.d/

RUN ls

RUN python3 /src/manage.py collectstatic --no-input \
  && npm run build


VOLUME ["/static"]

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/python3", "-u"]
