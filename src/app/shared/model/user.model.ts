export class User {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public firstname: string,
    public lastName: string,
    public token?: string
  ) {}
}
