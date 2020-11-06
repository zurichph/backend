import express from 'express';
import mongoose from 'mongoose';
import options from './config';
import routes from './routes';

const { dbUrl } = options;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3332, () => {
  console.log('🚀 Backend iniciado na porta 3332');
});
