import e, { Router } from "express";
import { AuthService } from "../services/auth.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";
import { AuthController } from "./controller";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
          );

        const authService = new AuthService(emailService);
        const controller = new AuthController(authService);

        router.post("/login", controller.login);

        return router;
    }

}