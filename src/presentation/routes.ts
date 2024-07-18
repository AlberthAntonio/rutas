import { Router } from "express";
import { UsersRoutes } from "./users/routes";
import { RepairsRoutes } from "./repairs/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/users", UsersRoutes.routes);
    router.use("/api/v1/repairs", RepairsRoutes.routes);

    return router;
  }
}
