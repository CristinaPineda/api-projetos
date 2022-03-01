import cors from 'cors';
import express, { json } from 'express';
import session from 'express-session';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';

const { urlencoded } = bodyparser;

dotenv.config();

const { SECRET } = process.env;

const app = express();

const PORT_URL = process.env.PORT || 5000;

app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use('/portfolio', projectRoutes);

app.listen(PORT_URL, () => {
  console.log('Servidor rodando');
});

export default app;
