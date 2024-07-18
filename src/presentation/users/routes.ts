import e, { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";
import { AuthService } from "../services/auth.service";
import { envs } from "../../config";
import { EmailService } from "../services/email.service";
import { AuthController } from "../auth/controller";
export class UsersRoutes {

    static get routes(): Router {

        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        );

        const authService = new AuthService(emailService);
        const Authcontroller = new AuthController(authService);
        const userService = new UserService(authService);
        const controller = new UserController(userService);


        router.get("/", controller.getAllUsers)
        router.get("/:id", controller.getUserById)
        router.post("/", controller.createNewUser)
        router.patch("/:id", controller.refreshListUsers)
        router.delete("/:id", controller.disableUser)

        router.post("/login", Authcontroller.login);
        
        return router;
    }

}