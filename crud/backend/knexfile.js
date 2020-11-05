// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 
    {
      database: 'techtestdb',
      user:     'fmst0',
      password: 'root',
      port: 5434
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations/'
    }
    
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
