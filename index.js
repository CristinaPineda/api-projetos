import express, { urlencoded, json } from 'express';
import session from 'express-session';
import { urlencoded as _urlencoded } from 'body-parser';
import cors from 'cors';

import projectRoutes from './routes/projectRoutes';

import Database from './database';

import projectRoutesRoot from './routes/projectRoutesRoot';

require('dotenv').config();

const { SECRET } = process.env;

const app = express();
const PORT_URL = process.env.PORT || 5000;

app.use(session({ secret: SECRET }));
app.use(_urlencoded({ extended: true }));

app.use(
  urlencoded({
    extended: true,
  }),
);

app.use(json());

app.use(cors());

app.use('/project', projectRoutes);

app.use('/', projectRoutesRoot);

app.listen(PORT_URL, () => {
  console.log('Servidor rodando');
});
