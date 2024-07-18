import { Router } from "express";
import { RepairsService } from "../services/repairs.service";
import { RepairsController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middlewares";

enum UserRol {
  EMPLOYEE = "EMPLOYEE",
  CLIENT = "CLIENT",
}
export class RepairsRoutes {
  static get routes(): Router {
    const router = Router();

    const repairsService = new RepairsService();
    const controller = new RepairsController(repairsService);

    router.post("/", controller.createRepairs);

    router.use(AuthMiddleware.protected);
    router.use(AuthMiddleware.restricTo(UserRol.EMPLOYEE));

    router.get("/", controller.getPendingRepairs);
    router.get("/:id", controller.getPendingRepairsByUserId);
    router.patch("/:id", controller.refreshRepairs);
    router.delete("/:id", controller.cancelRepairs);

    return router;
  }
}
