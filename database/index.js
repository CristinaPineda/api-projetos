const mongoose = require("mongoose");
require("dotenv").config();

const KEY = process.env.KEY;

mongoose
  .connect(
    `mongodb+srv://projectsCris:${KEY}@apicluster.ue08x.mongodb.net/bancoProjetos?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongodbAtlas connect");
  })
  .catch((err) => console.log(err));

  const bd = mongoose.connection;

  module.exports = bd;