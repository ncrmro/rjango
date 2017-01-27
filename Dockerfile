FROM ncrmro/adbase

ENV INSTALL_PATH=/adbase \
    DJANGO_SETTINGS_MODULE=ango.settings.prod \
    SECRET_KEY=000000000000000 \
    DATABASE_URL=sqlite:////src/db.sqlite3 \
    ALLOWED_HOSTS=['*']

WORKDIR $INSTALL_PATH

COPY . $INSTALL_PATH

RUN pip3 install -r $INSTALL_PATH/requirements.txt \
 && yarn install --ignore-scripts

RUN npm run build \
 && python3 ./manage.py collectstatic --no-input

EXPOSE 8000

ENTRYPOINT ["python3", "-u"]
