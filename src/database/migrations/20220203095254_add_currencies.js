exports.up = function(knex) {
  return knex.raw(`
    create table banks (
      id bigserial primary key,
      name text,
      constraint banks_unique_name unique (name)
    );

    grant select, insert, update, delete on banks to app;
    grant all privileges on banks_id_seq to app;

    create table currencies (
      id bigserial primary key,
      name text,
      constraint currencies_unique_name unique (name)
    );

    grant select, insert, update, delete on banks to app;
    grant all privileges on banks_id_seq to app;

    create table exchange_currencies (
      bay numeric,
      sale numeric,
      bank_id bigint references banks (id) not null,
      date date,
      currency_id smallint references currencies (id) not null,
      constraint exchange_currencies_unique_name unique (bank_id, date, currency_id)
    );

    grant select, insert, update, delete on exchange_currencies to app;
  `)
};

exports.down = function(knex) {
  return knex.raw(`
    drop table currencies;
    drop table exchange_currencies;
    drop table banks;
  `)
};
