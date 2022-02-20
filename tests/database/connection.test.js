import * as mongoose from 'mongoose';
import { MockMongoose } from 'mock-mongoose';

import dotenv from 'dotenv';

dotenv.config();

const { KEY, URI } = process.env;

const mockMongoose = new MockMongoose(mongoose);

mockMongoose.prepareStorage().then(() => {
  mongoose.connect(`${KEY}${URI}`);
  mongoose.connection.on('connected', () => {
    console.log('db connection is now open');
  });
});

export default mockMongoose;
