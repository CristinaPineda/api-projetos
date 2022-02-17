import { connect, connection } from 'mongoose';

require('dotenv').config();

const { KEY, URI } = process.env;

connect(
  `mongodb+srv://${KEY}${URI}`,
)
  .then(() => {
    console.log('MongodbAtlas conectado com sucesso!');
  })
  .catch((err) => console.log(err));

const bd = connection;

export default bd;
