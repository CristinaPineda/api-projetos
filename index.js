import express from 'express';

const { PORT } = process.env;

const app = express();

const PORT_URL = PORT || 5000;

app.use(express.json());

app.get('/', (_req, res) => res.send({ message: 'API connect' }));

app.listen(PORT_URL, () => {
  console.log(`Servidor rodando em ${PORT_URL}`);
});
