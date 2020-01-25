const express = require('express');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const connectMongoDatabase = require('./database/mongo');
const schema = require('./schema/schema');

// starting express app
const app = express();

// env
const PORT = process.env.API_PORT;

// database
connectMongoDatabase();

// middleware
app.use(bodyParser.json());

app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true,
  }),
);

app.get('/', (req, res, next) => {
  res.send('Hello world');
});

const server = app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 접속했습니다.`);
});

// Handle unhandled promise rejections 처리되지 않은 약속 거부 처리
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
