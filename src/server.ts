import express from 'express';

const PORT = 8080;

const app: express.Application = express();

app.use('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`app listen on port ${PORT}`);
});
