import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

mongoose.connect('mongodb+srv://f2kjfnkjas:X1UErDqFywXwThin@zuri.lx3hy.mongodb.net/tests?retryWrites=true&w=majority', {
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
