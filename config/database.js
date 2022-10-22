const { DB_SUERNAME = 'postgres', DB_PASSWORD = 'oby', DB_NAME = 'database_development', DB_HOST = '127.0.0.1' } = process.env;
module.exports = {
  development: {
    username: DB_SUERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
