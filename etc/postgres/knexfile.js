module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://app:app@localhost/app',
    acquireConnectionTimeout: 2000,
    migrations: {
      directory: __dirname + '../../../src/database/migrations',
    }
  },
  // development: {
  //   client: 'pg',
  //   connection: {
  //     driver: 'pg',
  //     user: 'test',
  //     password: 'test',
  //     host: 'localhost',
  //     port: 5433,
  //     database: 'test'
  //   },
  //   acquireConnectionTimeout: 2000,
  //   migrations: {
  //     directory: __dirname + '../../../src/database/migrations',
  //   }
  // },
  production: {
    client: 'pg',
    connection: {
      driver: 'pg',
      user: 'test',
      password: 'test',
      host: 'localhost',
      port: 5433,
      database: 'test'
    },
    acquireConnectionTimeout: 2000,
    migrations: {
      directory: __dirname + '../../../src/database/migrations',
    }
  }
};