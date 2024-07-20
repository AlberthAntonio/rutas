import { regularExp } from "../../../config/regular-exp";

export class UpdateUserDTO {
  private constructor(
    public readonly name: string,
    public readonly email: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateUserDTO?] {
    const { name, email} = object;

    if (!name) return ["name is required"];
    if (!email) return ["email is required"];
    if (!regularExp.email.test(email)) return ["email is invalid"];

    return [undefined, new UpdateUserDTO(name, email)];
  }
}
