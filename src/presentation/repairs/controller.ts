import { Request, Response } from "express";
import { RepairsService } from "../services/repairs.service";

export class RepairsController {

    constructor (
        private readonly repairsService: RepairsService
    ){}  

    getPendingRepairs = (req: Request, res: Response) => {

        this.repairsService.getPendingRepairs()
            .then(repairs => {
                return res.status(200).json(repairs);
            })
            .catch((error:any) => {
                return res.status(400).json(error);
            });
    }

    getPendingRepairsByUserId = (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(+id)) {
            return res.status(400).json({ message: "invalid id" })
        }

        this.repairsService.getpendingRepairsByUserId(+id)
            .then(repairs => {
                return res.status(200).json(repairs);
            })
            .catch((error:any) => {
                return res.status(400).json(error);
            });
    }

    createRepairs = (req: Request, res: Response) => {
        const { date, userId } = req.body;

        this.repairsService.createRepairs({ date, userId })
            .then(repairs => {
                res.status(201).json(repairs);
            })
            .catch(error => {
                res.status(400).json(error);
            });
    }

    refreshRepairs = (req: Request, res: Response) => {
        const { id } = req.params;

        if (isNaN(+id)) {
            return res.status(400).json({ message: "invalid id" })
        }
        
        this.repairsService.updateRepairs(+id)
            .then(repairs => {
                return res.status(200).json(repairs);
            })
            .catch(error => {
                return res.status(400).json(error);
            });
    }

    cancelRepairs = (req: Request, res: Response) => {}



}