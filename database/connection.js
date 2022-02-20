import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const { connect, connection } = mongoose;

const { KEY, URI } = process.env;

connect(
  `${KEY}${URI}`,
)
  .then(() => {
    console.log('MongodbAtlas conectado');
  })
  .catch(() => console.log(`Banco não conectado ${KEY}`));

const bd = connection;

export default bd;
