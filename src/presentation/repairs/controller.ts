import { Request, Response } from "express";
import { RepairsService } from "../services/repairs.service";
import { CreateRepairDTO } from "../../domain/dtos/repairs/create-repair.dto";
import { CustomError } from "../../domain/errors/custom.errors";

export class RepairsController {
  constructor(private readonly repairsService: RepairsService) {}

  private handleError = (error: unknown, res: Response) => {
    console.log(error);
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  };

  getPendingRepairs = (req: Request, res: Response) => {
    this.repairsService
      .getPendingRepairs()
      .then((repairs) => res.status(200).json(repairs))
      .catch((error: any) => this.handleError(error, res));
  };

  getPendingRepairsByUserId = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.status(400).json({ message: "invalid id" });

    this.repairsService
      .getpendingRepairsByUserId(+id)
      .then((repairs) => res.status(200).json(repairs))
      .catch((error: any) => this.handleError(error, res));
  };

  createRepairs = (req: Request, res: Response) => {
    const [error, repair] = CreateRepairDTO.create(req.body);
    if (error) return res.status(400).json({ message: error });

    this.repairsService
      .createRepairs(repair!)
      .then((repairs) => res.status(201).json(repairs))
      .catch((error) => this.handleError(error, res));
  };

  refreshRepairs = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.status(400).json({ message: "invalid id" });

    this.repairsService
      .updateRepairs(+id)
      .then((repairs) => res.status(200).json(repairs))
      .catch((error) => this.handleError(error, res));
  };

  cancelRepairs = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.status(400).json({ message: "invalid id" });

    this.repairsService
      .cancelRepairs(+id)
      .then((repairs) => res.status(200).json(repairs))
      .catch((error) => this.handleError(error, res));
  };
}
