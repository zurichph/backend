import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

export default mongoose.model('stock', StockSchema);
