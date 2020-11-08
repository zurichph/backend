import mongoose from 'mongoose';
import AddressValidator from '../services/ValidateAddresssService';

const AddressSchema = new mongoose.Schema({
  name1: {
    required: true,
    type: String,
    maxlength: AddressValidator.maxNameSize,
  },
  name2: {
    required: true,
    type: String,
    maxlength: AddressValidator.maxNameSize,
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

type Name = {name1: string, name2:string};
// eslint-disable-next-line func-names
AddressSchema.virtual('name').get(function (this: Name): string {
  return `${this.name1} ${this.name2}`;
});

export default mongoose.model('address', AddressSchema);
