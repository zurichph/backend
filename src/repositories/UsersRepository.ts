import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import User from '../schemas/User';
import options from '../config';

const { jwtSecret } = options;

class UsersRepository {
  public async create({ username, password }: Users): Promise<Users> {
    const user = new Users({ username, password });

    const UserExists = await User.findOne({ username });

    if (UserExists) {
      throw new Error('User already exists.');
    }

    const salt = bcrypt.genSaltSync(13);
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

  public async login({ username, password }: Users): Promise<string> {
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.toObject().password || null)) {
      throw new Error('Verifique o usuário e senha.');
    }

    const token = jwt.sign({ _id: user.toObject()._id }, jwtSecret, { expiresIn: '6h' });

    return token;
  }
}

export default UsersRepository;
