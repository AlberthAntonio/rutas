import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { error } from "console";
import { CustomError } from "../../domain/errors/custom.errors";
import { CreateUserDTO } from "../../domain/dtos/users/create-use.dto";
import { UpdateUserDTO } from "../../domain/dtos/users/update-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    console.log(error);
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  };

  getAllUsers = (req: Request, res: Response) => {
    this.userService
      .getAllUsers()
      .then((users) => {return res.status(200).json(users)})
      .catch((error: unknown) => this.handleError(error, res));
  };

  getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {return res.status(400).json({ message: "invalid id" })}

    this.userService
      .getUserById(+id)
      .then((user_id) => {return res.status(200).json(user_id)})
      .catch((error: unknown) => this.handleError(error, res));
  };

  createNewUser = (req: Request, res: Response) => {
    const [error, user] = RegisterUserDto.create(req.body);

    if (error) return res.status(422).json({ error: error });

    this.userService
      .createUser(user!)
      .then((user) => res.status(201).json(user))
      .catch((error: unknown) => this.handleError(error, res));
  };

  refreshListUsers = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.status(422).json({ message: "invalid id" });

    const [error, user] = UpdateUserDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.userService
      .refreshList(user!, +id)
      .then((user) => res.status(200).json(user))
      .catch((error: unknown) => this.handleError(error, res));
  };

  disableUser = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.status(422).json({ message: "invalid id" });

    this.userService
      .disableUser(+id)
      .then((user) => res.status(200).json(user))
      .catch((error: unknown) => this.handleError(error, res));
  };
}
