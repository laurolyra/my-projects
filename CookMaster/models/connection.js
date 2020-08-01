const mysqlx = require('@mysql/xdevapi');

const dbLogin = () => mysqlx.getSession({
  user: 'root',
  password: 'password',
  host: 'localhost',
  port: 33060,
  schema: 'cook_master',
});

const dbGetSchema = () =>
  dbLogin()
    .then((session) => session.getSchema('cook_master'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = {
  dbLogin,
  dbGetSchema,
};
