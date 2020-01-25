const express = require('express');
const app = express();

// env
const PORT = process.env.API_PORT;

app.get('/', (req, res, next) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 접속했습니다.`);
});
