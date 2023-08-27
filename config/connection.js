const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkApiDB';

  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// connect(connectionString);

connect(connectionString, mongooseOptions).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

module.exports = connection;