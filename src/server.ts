import express from 'express';
import {
  getMatchDetail,
  getPlayerInMatch,
} from './data/source/matches/matchDetail';

const PORT = 8080;

const app: express.Application = express();

app.get('/matches/:id', async (req, res) => {
  const params = req.params;

  const detail = await getMatchDetail(Number(params.id));

  console.log(detail);

  res.status(200).json(detail);
});

app.get('/player/:playerId/matches/:matchId', async (req, res) => {
  const params = req.params;

  const detail = await getPlayerInMatch(
    Number(params.matchId),
    Number(params.playerId)
  );

  console.log(detail);

  res.status(200).json(detail);
});

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`app listen on port ${PORT}`);
});
