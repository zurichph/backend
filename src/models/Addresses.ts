type fixedSizeArray<N extends number, T, M extends string = '0'> = {
  readonly [k in M]: string;
} & { length: N } & ReadonlyArray<T>;
const isNameArray = (x: string | fixedSizeArray<2, string>): x is fixedSizeArray<2, string> => true;

class Addresses {
  readonly states: Array<string> = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'] // eslint-disable-line indent

  readonly maxNameSize: number = 42;

  readonly maxPhoneSize: number = 12;

  readonly maxStreetNameSize: number = 33;

  readonly maxStreetNumber: number = 99999999;

  readonly maxNeighborhoodSize: number = 42;

  readonly maxCitySize: number = 26;

  readonly maxComplementSize: number = 26;

  readonly maxObservationSize: number = 60;

  name!: string;

  name2?: string;

  phone?: string;

  streetName: string;

  streetNumber!: number;

  neighborhood: string;

  city: string;

  state!: number | string;

  complement?: string;

  observation?: string;

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
    this.changeName(name);
    if (phone) this.changePhone(phone);
    this.validateSize(streetName.length, this.maxStreetNameSize, 'Street Name');
    this.streetName = streetName;
    this.changeStreetNumber(streetNumber);
    this.validateSize(
      neighborhood.length,
      this.maxNeighborhoodSize,
      'Neighborhood',
    );
    this.neighborhood = neighborhood;
    this.validateSize(city.length, this.maxCitySize, 'City');
    this.city = city;
    this.changeState(state);
    this.validateSize(
      (complement || '').length,
      this.maxComplementSize,
      'Complement',
      false,
    );
    this.complement = complement;
    this.validateSize(
      (observation || '').length,
      this.maxObservationSize,
      'Observation',
      false,
    );
    this.observation = observation;
  }

  private validateSize(
    contentSize: number,
    maxSize: number,
    name: string,
    required = true,
  ) {
    const it = `Error: ${name}`;
    if (contentSize > maxSize) {
      throw new Error(`${it} is too large!`);
    }
    if (required && !contentSize) {
      throw new Error(`${it} cannot be empty!`);
    }
  }

  private changeName(name: string) {
    const nameLength = name.length;
    const errName = 'Name';
    if (nameLength > this.maxNameSize) {
      const maxTotalSize = this.maxNameSize * 2 - 1; // name + name + space
      this.validateSize(nameLength, maxTotalSize, errName);
      this.name = name.slice(0, this.maxNameSize);
      this.name2 = name.slice(this.maxNameSize);
    } else {
      this.validateSize(nameLength, this.maxNameSize, errName);
      this.name = name;
      this.name2 = undefined;
    }
  }

  public get getName(): string {
    const name = this.getName;
    if (isNameArray(name)) {
      return `${name[0]} ${name[1]}`;
    } // else
    return name;
  }

  public get getNamesArray(): string | fixedSizeArray<2, string> {
    if (this.name2) {
      return [this.name, this.name2];
    } // else
    return this.name;
  }

  public set setName(name: string) {
    this.validateSize(name.length, this.maxNameSize, 'Name');
    this.changeName(name);
  }

  private changePhone(phone: string) {
    const name = 'Phone number';
    const it = `Error: ${name}`;
    let sanitized:string = phone.replace('-', '');
    const validator = /^((?:[0-9]){0,2})(?:\+|\s){0,5}([0-9]{6,14})$/;
    const matches:boolean = validator.test(sanitized) || false;
    if (!matches) {
      throw new Error(`${it} is not in a valid format!`);
    }
    sanitized = phone.replace(validator, '$1+$2');
    const phoneLength:number = sanitized.length;
    this.validateSize(phoneLength, this.maxPhoneSize, name);
    this.phone = sanitized;
  }

  public set setPhone(phone: string) {
    this.changePhone(phone);
  }

  public get getPhone(): string {
    if (this.phone) {
      return this.phone.replace('+', ' ');
    }
    return '';
  }

  public set setStreetName(streetName: string) {
    this.validateSize(streetName.length, this.maxStreetNameSize, 'Street Name');
    this.streetName = streetName;
  }

  private changeStreetNumber(streetNumber: number) {
    const it = 'Error: Street number';
    if (streetNumber > this.maxStreetNumber) {
      throw new Error(`${it} is too big!`);
    }
    if (streetNumber < 0) {
      throw new Error(`${it} cannot be negative!`);
    }
    this.setStreetNumber = streetNumber;
  }

  public set setStreetNumber(streetNumber: number) {
    this.changeStreetNumber(streetNumber);
  }

  public set setNeighborHood(neighborhood: string) {
    this.validateSize(neighborhood.length, this.maxNeighborhoodSize, 'Neighborhood');
    this.neighborhood = neighborhood;
  }

  public set setCity(city: string) {
    this.validateSize(city.length, this.maxCitySize, 'City');
    this.city = city;
  }

  private stateIntToStr(state:number):string {
    if (
      state < 0
      || state >= this.states.length
      || !Number.isInteger(state)
    ) {
      throw new Error('Error: State is not valid!');
    }
    return this.states[state];
  }

  private changeState(state: string| number) {
    let stateStr:string;
    if (typeof state === 'number') {
      stateStr = this.stateIntToStr(state);
    } else {
      stateStr = state;
    }
    const it = 'Error: State';
    if (stateStr.length > 2) {
      throw new Error(`${it} should only contain two letters!`);
    }
    const stateIndex: number = this.states.indexOf(stateStr.toUpperCase());
    if (stateIndex === -1) {
      throw new Error(`${it} was not found`);
    }
    this.state = stateIndex;
  }

  public get getState(): string {
    if (typeof this.state === 'number') return this.stateIntToStr(this.state);
    return this.state;
  }

  public set setState(state: string) {
    this.changeState(state);
  }

  public get getComplement(): string {
    return this.complement || '';
  }

  public set setComplement(complement: string) {
    this.complement = complement;
    this.validateSize(
      complement.length,
      this.maxComplementSize,
      'Complement',
      false,
    );
  }

  public get getObservation(): string {
    return this.observation || '';
  }

  public set setObservation(observation: string) {
    this.validateSize(
      observation.length,
      this.maxObservationSize,
      'Observation',
      false,
    );
    this.observation = observation;
  }
}

export default Addresses;
