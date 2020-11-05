import User from '../models/Users';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  username: string;
  password: string;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ username, password }: Request): Promise<User> {
    if (password.length < 10) {
      throw new Error('Your password is too short.');
    }

    const user = await this.usersRepository.create({
      username,
      password,
    });

    return user;
  }
}

export default CreateUserService;
