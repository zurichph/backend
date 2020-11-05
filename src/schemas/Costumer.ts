import mongoose from 'mongoose';

const CostumerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: false,
  },
  telefone: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

export default mongoose.model('costumer', CostumerSchema);
