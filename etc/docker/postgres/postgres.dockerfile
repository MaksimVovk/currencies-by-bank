FROM postgres:9.6
COPY ./setup.sql /docker-entrypoint-initdb.d