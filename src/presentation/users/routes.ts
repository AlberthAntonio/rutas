import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";

export class UsersRoutes {

    static get routes(): Router {

        const router = Router();

        const userService = new UserService();
        const controller = new UserController(userService);

        router.get("/", controller.getAllUsers)
        router.get("/:id", controller.getUserById)
        router.post("/", controller.createNewUser)
        router.patch("/:id", controller.refreshListUsers)
        router.delete("/:id", controller.disableUser)
        
        return router;
    }

}