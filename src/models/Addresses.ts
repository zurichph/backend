class Addresses {
  public zipCode: string;

  public streetName: string;

  public streetNumber: number;

  public neighborhood: string;

  public city: string;

  public state: string;

  public complement?: string;

  public observation?: string;

  constructor({
    zipCode,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
    observation,
  }: Addresses) {
    this.zipCode = zipCode;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.complement = complement;
    this.observation = observation;
  }
}

export default Addresses;
