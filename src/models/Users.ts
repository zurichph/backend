class Users {
  username: string;

  password: string;

  constructor({ username, password }: Users) {
    this.username = username;
    this.password = password;
  }
}

export default Users;
