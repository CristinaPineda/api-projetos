import cors from 'cors';
import express, { json } from 'express';
import session from 'express-session';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';

// eslint-disable-next-line import/extensions
import bd from './database/connection.js';

const { urlencoded } = bodyparser;
// import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const { SECRET } = process.env;

const app = express();

const PORT_URL = process.env.PORT || 5000;

app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// app.use('/project', projectRoutes);

// teste de rota de servidor
app.get('/', (_req, res) => res.send({ message: 'Server OK' }));

app.listen(PORT_URL, bd, () => {
  console.log('Servidor rodando');
});
