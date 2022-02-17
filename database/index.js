const mongoose = require('mongoose');
require('dotenv').config();

const { KEY, URI } = process.env;

mongoose
  .connect(
    `mongodb+srv://${KEY}${URI}`,
  )
  .then(() => {
    console.log('MongodbAtlas conectado com sucesso!');
  })
  .catch((err) => console.log(err));

const bd = mongoose.connection;

module.exports = bd;
