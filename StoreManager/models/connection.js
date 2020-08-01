const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

const connection = () => (
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('store_manager'))
);

module.exports = connection;
