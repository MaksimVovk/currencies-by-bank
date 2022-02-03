create user root with password 'root';
create user app with password 'app';

create database app template template0 owner root
  encoding 'utf8'
  lc_collate = 'en_US.UTF-8'
  lc_ctype = 'en_US.UTF-8';

\connect app

set role root;

grant connect on database app to app;
alter default privileges in schema public grant all on sequences to app;
alter default privileges in schema public grant select, insert, update, delete on tables to app;
