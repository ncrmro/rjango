FROM python:3.6-alpine

ENV INSTALL_PATH=/ango/

RUN mkdir $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY ./deps/ $INSTALL_PATH/deps/

RUN apk add --no-cache --virtual .build-deps \
  build-base postgresql-dev libffi-dev \
    && pip3 install -r $INSTALL_PATH/deps/prod.txt \
    && find /usr/local \
        \( -type d -a -name test -o -name tests \) \
        -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
        -exec rm -rf '{}' + \
    && runDeps="$( \
        scanelf --needed --nobanner --recursive /usr/local \
                | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
                | sort -u \
                | xargs -r apk info --installed \
                | sort -u \
    )" \
    && apk add --virtual .rundeps $runDeps \
    && apk del .build-deps

COPY ./src $INSTALL_PATH

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/python3", "-u", "./manage.py"]