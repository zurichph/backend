type fixedSizeArray<N extends number, T, M extends string = '0'> = {
  readonly [k in M]: string;
} & { length: N } & ReadonlyArray<T>;

type nameArray = fixedSizeArray<2, string>;
type nameType = string | nameArray;

const isNameArray = (x: nameType): x is nameArray => true;

class Addresses {
  // eslint-disable-next-line
  private readonly states: Array<string> = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'] // eslint-disable-line indent

  private readonly maxNameSize: number = 42;

  private readonly maxPhoneSize: number = 12;

  private readonly maxStreetNameSize: number = 33;

  private readonly maxStreetNumber: number = 99999999;

  private readonly maxNeighborhoodSize: number = 42;

  private readonly maxCitySize: number = 26;

  private readonly maxComplementSize: number = 26;

  private readonly maxObservationSize: number = 60;

  // (TODO) Check underlying function
  private name: nameType;

  private phone?: string;

  public __streetName: string;

  // (OK) checked constructor
  // (TODO) check underliying function
  public _streetNumber: number;

  public _neighborhood: string;

  public _city: string;

  // TODO Check constructor
  // (TODO) Check underlying function
  private state: number | string;

  private complement?: string;

  private observation?: string;

  constructor({
    name,
    phone,
    __streetName,
    _streetNumber,
    _neighborhood,
    _city,
    state,
    complement,
    observation,
  }: Addresses) {
    // Define name definetively
    if (isNameArray(name)) this.changeName(`${name[0]} ${name[1]}`);
    else this.changeName(name);
    if (phone) this.changePhone(phone);
    this.validateSize(__streetName.length, this.maxStreetNameSize, 'Street Name');
    this.__streetName = __streetName;
    this.changeStreetNumber(_streetNumber);
    this.validateSize(
      _neighborhood.length,
      this.maxNeighborhoodSize,
      'Neighborhood',
    );
    this._neighborhood = _neighborhood;
    this.validateSize(_city.length, this.maxCitySize, 'City');
    this._city = _city;
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
    const errMsg = 'Name';
    const nameArr = name.split(/\s+/);
    let name1 = nameArr.join(' ');
    this.validateSize(name1.length, this.maxNameSize * 2, errMsg);
    if (name1.length <= this.maxNameSize) {
      this.name = name1;
      return;
    } // else
    let name2 = name1;
    do {
      nameArr.pop();
      name1 = nameArr.join(' ');
    } while (name1.length > this.maxNameSize);
    name2 = name2.slice(name1.length + 1);
    this.validateSize(name1.length, this.maxNameSize * 2, errMsg);
    this.validateSize(name2.length, this.maxNameSize * 2, errMsg);
    this.name = [name1, name2];
  }

  private get varName(): string {
    const { name } = this;
    if (isNameArray(name)) {
      return `${name[0]} ${name[1]}`;
    } // else
    return name;
  }

  public get _ApiCorreiosName(): nameType {
    if (isNameArray(this.name)) {
      if (this.name[1]) {
        return [this.name[0], this.name[1]];
      }
    } // else
    return this.name;
  }

  public set newName(name: string) {
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

  public set newPhone(phone: string) {
    this.changePhone(phone);
  }

  public get varPhone(): string {
    if (this.phone) {
      return this.phone.replace('+', ' ');
    }
    return '';
  }

  public set newStreetName(_streetName: string) {
    this.validateSize(_streetName.length, this.maxStreetNameSize, 'Street Name');
    this.__streetName = _streetName;
  }

  private changeStreetNumber(_streetNumber: number) {
    const it = 'Error: Street number';
    if (_streetNumber > this.maxStreetNumber) {
      throw new Error(`${it} is too big!`);
    }
    if (_streetNumber < 0) {
      throw new Error(`${it} cannot be negative!`);
    }
    this._streetNumber = _streetNumber;
  }

  public set newStreetNumber(_streetNumber: number) {
    this.changeStreetNumber(_streetNumber);
  }

  public set newNeighborHood(_neighborhood: string) {
    this.validateSize(_neighborhood.length, this.maxNeighborhoodSize, 'Neighborhood');
    this._neighborhood = _neighborhood;
  }

  public set newCity(_city: string) {
    this.validateSize(_city.length, this.maxCitySize, 'City');
    this._city = _city;
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

  public get varState(): string {
    if (typeof this.state === 'number') return this.stateIntToStr(this.state);
    return this.state;
  }

  public set newState(state: string) {
    this.changeState(state);
  }

  public get varComplement(): string {
    return this.complement || '';
  }

  public set newComplement(complement: string) {
    this.complement = complement;
    this.validateSize(
      complement.length,
      this.maxComplementSize,
      'Complement',
      false,
    );
  }

  public get varObservation(): string {
    return this.observation || '';
  }

  public set newObservation(observation: string) {
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
