import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  zipCode: {
    required: true,
    type: String,
  },
  streetName: {
    required: true,
    type: String,
  },
  streetNumber: {
    required: true,
    type: Number,
  },
  neighborhood: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  state: {
    required: true,
    type: String,
  },
  complement: {
    required: false,
    type: String,
  },
  observation: {
    required: false,
    type: String,
  },
});

export default mongoose.model('address', AddressSchema);
