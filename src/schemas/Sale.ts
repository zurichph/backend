import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
  stockId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  clientId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  shippmentPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  observations: {
    type: String,
    required: false,
  },
  receipt: {
    type: String,
    required: true,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('sale', SaleSchema);
