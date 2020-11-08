import mongoose from 'mongoose';
import AddressValidator from '../services/ValidateAddresssService';

const AddressSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxlength: AddressValidator.maxNameSize * 2,
  },
  phone: {
    required: false,
    type: String,
    maxlength: AddressValidator.maxPhoneSize,
  },
  streetName: {
    required: true,
    type: String,
    maxlength: AddressValidator.maxStreetNameSize,
  },
  streetNumber: {
    required: true,
    type: Number,
    maxlength: AddressValidator.maxStreetNameSize,
  },
  neighborhood: {
    required: true,
    type: String,
    maxlength: AddressValidator.maxNeighborhoodSize,
  },
  city: {
    required: true,
    type: String,
    maxlength: AddressValidator.maxCitySize,
  },
  state: {
    required: true,
    type: Number,
  },
  complement: {
    required: false,
    type: String,
    maxlength: AddressValidator.maxComplementSize,
  },
  observation: {
    required: false,
    type: String,
    maxlength: AddressValidator.maxObservationSize,
  },
});

export default mongoose.model('address', AddressSchema);
