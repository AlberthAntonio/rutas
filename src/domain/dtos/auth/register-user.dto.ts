import { regularExp } from "../../../config/regular-exp";


export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ["Missing first name"];
    if (!email) return ["Missing email"];
    if (!regularExp.email.test(email)) return ["Invalid email"];
    if (!password) return ["Missing password"];
    if (!regularExp.password.test(password))
      return [
        "The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ];

    return [
      undefined,
      new RegisterUserDto(name, email, password),
    ];
  }
}
