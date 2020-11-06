import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import User from '../schemas/User';
import options from '../config';

const { jwtSecret } = options;

class UsersRepository {
  readonly hashTimeFiller: string;

  readonly saltIterations: number = 13;

  constructor() {
    const timePaddingPassword = 'avoidUserEnumeration';
    const salt = bcrypt.genSaltSync(this.saltIterations);
    const fillerPassword = bcrypt.hashSync(timePaddingPassword, salt);
    this.hashTimeFiller = fillerPassword;
  }

  public async create({ username, password }: Users): Promise<Users> {
    const user = new Users({ username, password });

    const UserExists = await User.findOne({ username });

    if (UserExists) {
      throw new Error('User already exists.');
    }

    const salt = bcrypt.genSaltSync(this.saltIterations);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      await new User({
        username,
        password: hashedPassword,
      }).save();
    } catch (error) {
      throw new Error(error.message);
    }

    return user;
  }

  private async consumeLoginTime(password: string): Promise<void> {
    // a operacao terminaria muito antes se nao fizessemos um hashing,
    // por exemplo, se o usuario fosse invalido, bcrypt nao consumiria
    // esse tempo. essa parte evitaria entregar informacao que o usuario
    // ta errado pelo tempo de resposta menor que se o usurio existisse
    await bcrypt.compare(password, this.hashTimeFiller);
  }

  public async login({ username, password }: Users): Promise<string> {
    let passwordMatched = false;
    const user = await User.findOne({ username });

    if (user) {
      const storedPassword = user.toObject().password;
      if (storedPassword) {
        passwordMatched = await bcrypt.compare(password, storedPassword);
      } else {
        this.consumeLoginTime(password);
      }
    } else {
      this.consumeLoginTime(password);
    }

    if (!passwordMatched || !user) {
      throw new Error('Verifique o usuário e senha.');
    }

    const token = jwt.sign({ _id: user.toObject()._id }, jwtSecret, { expiresIn: '6h' });

    return token;
  }
}

export default UsersRepository;
