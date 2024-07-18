import { Request, Response } from "express";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { AuthService } from "../services/auth.service";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }

  register = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(422).json({ message: error });

    this.authService
      .register(registerUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  login = async (req: Request, res: Response) => {
    const [error, loginUseDto] = LoginUserDTO.create(req.body);

    if (error) return res.status(422).json({ error: error });

    this.authService
      .login(loginUseDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
