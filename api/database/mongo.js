const mongoose = require('mongoose');

const connectMongoDatabase = async () => {
  const conn = await mongoose.connect(process.env.API_MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectMongoDatabase;
