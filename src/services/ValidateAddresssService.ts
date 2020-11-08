type fixedSizeArray<N extends number, T, M extends string = '0'> = {
  readonly [k in M]: string;
} & { length: N } & ReadonlyArray<T>;

type nameArray = fixedSizeArray<2, string>;
type nameType = string | nameArray;

const isNameArray = (x: nameArray): x is nameArray => true;

export interface AddressMember {
  name?: nameType;
  phone?: string;
  streetName: string;
  streetNumber?: number;
  neighborhood: string;
  city: string;
  state?: number | string;
  complement?: string;
  observation?: string;
}

class AddressValidator {
  // eslint-disable-next-line
  static readonly states: Array<string> = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'] // eslint-disable-line indent
  // eslint-disable-next-line
  private readonly ListaDdd: Array<number> = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99]; // eslint-disable-line indent

  static readonly maxNameSize: number = 42;

  static readonly maxPhoneSize: number = 12;

  static readonly maxStreetNameSize: number = 33;

  static readonly maxStreetNumber: number = 99999999;

  static readonly maxNeighborhoodSize: number = 42;

  static readonly maxCitySize: number = 26;

  static readonly maxComplementSize: number = 26;

  static readonly maxObservationSize: number = 60;

  private name!: nameType;

  private phone!: string;

  public getStreetName: string;

  public getStreetNumber!: number;

  public getNeighborhood: string;

  public getCity: string;

  private state!: number | string;

  private complement?: string;

  private observation?: string;

  constructor({
    name = '',
    phone,
    streetName,
    streetNumber = 0,
    neighborhood,
    city,
    state = '',
    complement,
    observation,
  }: AddressMember) {
    // Define name definetively
    if (typeof name === 'string') {
      this.changeName(name);
    } else if (isNameArray(name)) {
      this.changeName(`${name[0]} ${name[1]}`);
    } else {
      throw new Error('Error: must have name');
    }
    if (phone) this.changePhone(phone);
    AddressValidator.validateSize(
      streetName.length,
      AddressValidator.maxStreetNameSize,
      'Street Name',
    );
    this.getStreetName = streetName;
    this.changeStreetNumber(streetNumber);
    AddressValidator.validateSize(
      neighborhood.length,
      AddressValidator.maxNeighborhoodSize,
      'Neighborhood',
    );
    this.getNeighborhood = neighborhood;
    AddressValidator.validateSize(city.length, AddressValidator.maxCitySize, 'City');
    this.getCity = city;
    this.changeState(state);
    AddressValidator.validateSize(
      (complement || '').length,
      AddressValidator.maxComplementSize,
      'Complement',
      false,
    );
    this.complement = complement;
    AddressValidator.validateSize(
      (observation || '').length,
      AddressValidator.maxObservationSize,
      'Observation',
      false,
    );
    this.observation = observation;
  }

  static validateSize(
    contentSize: number,
    maxSize: number,
    name: string,
    required = true,
  ): void {
    const it = `Error: ${name}`;
    if (contentSize > maxSize) {
      throw new Error(`${it} is too large!`);
    }
    if (required && !contentSize) {
      throw new Error(`${it} cannot be empty!`);
    }
  }

  static validateName(name: string) :void {
    AddressValidator.validateSize(name.length, AddressValidator.maxNameSize, 'Name');
  }

  static validatePhone(phone: string) : void {
    const name = 'Phone number';
    const it = `Error: ${name}`;
    let sanitized: string = phone.replace('-', '');
    const validator = /^((?:[0-9]){0,2})(?:\+|\s){0,5}([0-9]{6,14})$/;
    const matches: boolean = validator.test(sanitized) || false;
    if (!matches) {
      throw new Error(`${it} is not in a valid format!`);
    }
    sanitized = phone.replace(validator, '$1+$2');
    const phoneLength: number = sanitized.length;
    AddressValidator.validateSize(
      phoneLength,
      AddressValidator.maxPhoneSize,
      name,
    );
  }

  static validateStreetName(streetName: string): void {
    AddressValidator.validateSize(
      streetName.length,
      AddressValidator.maxStreetNameSize,
      'Street Name',
    );
  }

  static validateStreetNumber(streetNumber: number): void{
    const it = 'Error: Street number';
    if (streetNumber > AddressValidator.maxStreetNumber) {
      throw new Error(`${it} is too big!`);
    }
    if (streetNumber < 0) {
      throw new Error(`${it} cannot be negative!`);
    }
  }

  static validateNeighborhood(neighborhood: string): void {
    AddressValidator.validateSize(
      neighborhood.length,
      AddressValidator.maxNeighborhoodSize,
      'Neighborhood',
    );
  }

  static validateCity(city: string): void {
    AddressValidator.validateSize(
      city.length,
      AddressValidator.maxCitySize,
      'City',
    );
  }

  static validateStateIntToStr(state: number, displayError = true) : string {
    if (
      state < 0
      || state >= AddressValidator.states.length
      || !Number.isInteger(state)
    ) {
      if (displayError) throw new Error('Error: State is not valid!');
      else return '';
    }
    return AddressValidator.states[state];
  }

  static validateComplement(complement: string) : void {
    AddressValidator.validateSize(
      complement.length,
      AddressValidator.maxComplementSize,
      'Complement',
      false,
    );
  }

  static validateObservation(observation: string) : void {
    AddressValidator.validateSize(
      observation.length,
      AddressValidator.maxObservationSize,
      'Observation',
      false,
    );
  }

  private changeName(name: string) {
    const errMsg = 'Name';
    const nameArr = name.split(/\s+/);
    let name1 = nameArr.join(' ');
    AddressValidator.validateSize(name1.length, AddressValidator.maxNameSize * 2, errMsg);
    if (name1.length <= AddressValidator.maxNameSize) {
      this.name = name1;
      return;
    } // else
    let name2 = name1;
    do {
      nameArr.pop();
      name1 = nameArr.join(' ');
    } while (name1.length > AddressValidator.maxNameSize);
    name2 = name2.slice(name1.length + 1);
    AddressValidator.validateSize(name1.length, AddressValidator.maxNameSize * 2, errMsg);
    AddressValidator.validateSize(name2.length, AddressValidator.maxNameSize * 2, errMsg);
    this.name = [name1, name2];
  }

  public get getName(): string {
    if (!this.name) throw new Error("Error: name doesn't exist");
    const { name } = this;
    if (typeof name === 'string') {
      return name || '';
    } // else
    if (isNameArray(name)) {
      return `${name[0]} ${name[1]}`;
    }
    return '';
  }

  public get _apiCorreiosName(): nameType {
    if (!this.name) throw new Error("Error: name doesn't exist");
    if (typeof this.name === 'string') {
      return this.name || '';
    } // else
    if (isNameArray(this.name)) {
      return [this.name[0], this.name[1]];
    }
    return '';
  }

  public set newName(name: string) {
    AddressValidator.validateName(name);
    this.name = name;
  }

  private changePhone(phone: string) {
    AddressValidator.validatePhone(phone);
    this.phone = phone;
  }

  public set newPhone(phone: string) {
    this.changePhone(phone);
  }

  public get getPhone(): string {
    if (this.phone) {
      return this.phone.replace('+', ' ');
    }
    return '';
  }

  public set newStreetName(streetName: string) {
    AddressValidator.validateStreetName(streetName);
    this.getStreetName = streetName;
  }

  private changeStreetNumber(streetNumber: number) {
    AddressValidator.validateStreetNumber(streetNumber);
    this.getStreetNumber = streetNumber;
  }

  public set newStreetNumber(streetNumber: number) {
    this.changeStreetNumber(streetNumber);
  }

  public set newNeighborHood(neighborhood: string) {
    AddressValidator.validateNeighborhood(neighborhood);
    this.getNeighborhood = neighborhood;
  }

  public set newCity(city: string) {
    AddressValidator.validateCity(city);
    this.getCity = city;
  }

  static stateIntToStr(state: number): string {
    return AddressValidator.validateStateIntToStr(state);
  }

  static stateStrToInt(state: string, displayError = true): number {
    const it = 'Error: State';
    if (state.length > 2) {
      if (displayError) throw new Error(`${it} should only contain two letters!`);
      else return -1;
    }
    const stateIndex: number = AddressValidator.states.indexOf(
      state.toUpperCase(),
    );
    if (displayError && stateIndex === -1) {
      throw new Error(`${it} was not found`);
    }
    return stateIndex;
  }

  private changeState(state: string | number) {
    if (typeof state === 'number') {
      AddressValidator.stateIntToStr(state);
      this.state = state;
      return;
    }
    const newState = AddressValidator.stateStrToInt(state);
    this.state = newState;
  }

  public get getState(): string {
    if (typeof this.state === 'number') return AddressValidator.stateIntToStr(this.state);
    return this.state || '';
  }

  public set newState(state: string) {
    this.changeState(state);
  }

  public get getComplement(): string {
    return this.complement || '';
  }

  public set newComplement(complement: string) {
    AddressValidator.validateComplement(complement);
    this.complement = complement;
  }

  public get getObservation(): string {
    return this.observation || '';
  }

  public set newObservation(observation: string) {
    AddressValidator.validateObservation(observation);
    this.observation = observation;
  }
}

export default AddressValidator;
