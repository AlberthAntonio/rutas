import { Router } from "express";
import { RepairsService } from "../services/repairs.service";
import { RepairsController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middlewares";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";

enum UserRol {
  EMPLOYEE = "EMPLOYEE",
  CLIENT = "CLIENT",
}
export class RepairsRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );

    const authService = new AuthService(emailService);
    const userService = new UserService(authService);
    const repairsService = new RepairsService(userService);
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
