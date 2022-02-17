import { connect } from 'mongoose';

const { KEY, URI } = process.env;

const connectBD = async () => {
  connect(`${KEY}${URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongodbAtlas conectado com sucesso!');
    })
    .catch((err) => console.log(err));
};

export default connectBD;
