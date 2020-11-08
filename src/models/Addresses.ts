class Addresses {
  public name: string;

  public phone: string;

  public streetName: string;

  public streetNumber: number;

  public neighborhood: string;

  public city: string;

  public state: number;

  public complement?: string;

  public observation?: string;

  constructor({
    name,
    phone,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
    observation,
  }: Addresses) {
    this.name = name;
    this.phone = phone;
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
