import { In } from "typeorm";
import { Repairs, User } from "../../data";
import { CreateRepairDTO } from "../../domain/dtos/repairs/create-repair.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { UserService } from "./user.service";

enum RepairsStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export class RepairsService {
  constructor (
    private readonly UserService: UserService
  ){}


  async getPendingRepairs() {
    try {
      const repairs = await Repairs.find({
        where: {
          status: In([RepairsStatus.PENDING, RepairsStatus.COMPLETED]),
        },
      });
      return repairs;
    } catch (error: any) {
      throw new Error("internal server error");
    }
  }

  async getpendingRepairsByUserId(userId: number) {
    try {
      const repairs = await Repairs.findOne({
        where: {
          user: {id : userId},
          status: RepairsStatus.PENDING,
        },
      });
      if (!repairs) throw new Error("User already exists");

      return repairs;
    } catch (error: any) {
      throw new Error("internal server error");
    }
  }

  async createRepairs(repairData: CreateRepairDTO) {
    const userPromise = this.UserService.getUserById(repairData.userId);

    const [user] = await Promise.all([userPromise]);

    const repair = new Repairs();

    repair.date = repairData.date;
    repair.user = user;
    repair.description = repairData.description;
    repair.motorsNumber = repairData.motorsNumber;
    repair.status = RepairsStatus.PENDING;
    try {
      return await repair.save();
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }

  async updateRepairs(id: number) {
    const repair = await this.getpendingRepairsByUserId(id);

    repair.status = RepairsStatus.COMPLETED;
    try {
      return await repair.save();
    } catch (error) {
      console.log(error);
    }
  }

  async cancelRepairs(id: number) {
    const repair = await this.getpendingRepairsByUserId(id);

    repair.status = RepairsStatus.CANCELLED;
    try {
      return await repair.save();
    } catch (error) {
      console.log(error);
    }
  }
}
