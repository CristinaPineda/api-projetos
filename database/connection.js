import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const { KEY, URI } = process.env;

mongoose
  .connect(`${KEY}${URI}`, {
  })
  .catch((err) => {
    console.error(err);
  });

export default mongoose;
