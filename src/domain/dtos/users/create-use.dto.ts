import { regularExp } from "../../../config/regular-exp";

export class CreateUserDTO {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateUserDTO?] {
    const { name, email, password } = object;
    if (!name) return ["name is required"];
    if (!email) return ["email is required"];
    if (!regularExp.email.test(email)) return ["email is invalid"];
    if (!password) return ["password is required"];
    if (!regularExp.password.test(password)) return ["password is invalid"];

    return [undefined, new CreateUserDTO(name, email, password)];
  }
}
