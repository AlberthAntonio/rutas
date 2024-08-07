import { User } from "../../data";
import { CreateUserDTO } from "../../domain/dtos/users/create-use.dto";
import { UpdateUserDTO } from "../../domain/dtos/users/update-user.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { AuthService } from "./auth.service";

enum UserRol {
  EMPLOYEE = "EMPLOYEE",
  CLIENT = "CLIENT",
}

enum Status {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export class UserService {
  constructor(
    private readonly authService: AuthService
  ) {}

  async getAllUsers() {
    try {
      const users = await User.find({
        where: {
          status: Status.ACTIVE,
        },
      });
      return users;
    } catch (error: any) {
      throw new Error("internal server error");
    }
  }

  async getUserById(id: number) {
    try {
      const user = await User.findOne({
        where: {
          id: id,
          status: Status.ACTIVE,
        },
      });
      if (!user) {
        throw new Error("User already exists");
      }
      return user;
    } catch (error: any) {
      throw new Error("internal server error");
    }
  }

  async createUser(userData: CreateUserDTO) {
    const registerUserDto = {
      name: userData.name.toLowerCase().trim(),
      email: userData.email.toLowerCase().trim(),
      password: userData.password.trim(),
    };

    return await this.authService.register(registerUserDto);
  }

  async refreshList(userData: UpdateUserDTO, id: number) {
    const user = await this.getUserById(id);
    user.name = userData.name.toLowerCase().trim();
    user.email = userData.email.toLowerCase().trim();

    try {
      await user.save();
      return user;
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }

  async disableUser(id: number) {
    const user = await this.getUserById(id);

    user.status = Status.DISABLED;
    try {
      await user.save();
      return user;
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
}
