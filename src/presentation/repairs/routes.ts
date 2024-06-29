import { Router } from "express";
import { RepairsService } from "../services/repairs.service";
import { RepairsController } from "./controller";

export class RepairsRoutes {

    static get routes(): Router {

        const router = Router();

        const repairsService = new RepairsService();
        const controller = new RepairsController(repairsService);

        router.get("/", controller.getPendingRepairs)
        router.get("/:id", controller.getPendingRepairsByUserId)
        router.post("/", controller.createRepairs)
        router.patch("/:id", controller.refreshRepairs)
        router.delete("/:id", controller.cancelRepairs)
        
        return router;
    }

}