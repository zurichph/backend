class Addresses {
  public Name1: string;

  public Name2: string;

  public phone: string;

  public streetName: string;

  public streetNumber: number;

  public neighborhood: string;

  public city: string;

  public state: number;

  public complement?: string;

  public observation?: string;

  constructor({
    Name1,
    Name2,
    phone,
    streetName,
    streetNumber,
    neighborhood,
    city,
    state,
    complement,
    observation,
  }: Addresses) {
    this.Name1 = Name1;
    this.Name2 = Name2;
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
