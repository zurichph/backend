import mongoose, { Schema } from 'mongoose';

const CostumerSchema = new mongoose.Schema({
  addressId: {
    type: Schema.Types.ObjectId,
    ref: 'address',
  },
  name: {
    type: String,
    required: true,
  },
  cpf: {
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
