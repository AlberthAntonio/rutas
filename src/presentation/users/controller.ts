import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { error } from "console";

export class UserController {

    constructor(
        public readonly userService: UserService
    ) {}

    getAllUsers = (req: Request, res: Response) => {
        
        this.userService.getAllUsers()
            .then(users => {
                return res.status(200).json(users);
            })
            .catch((error:any) => {
                return res.status(400).json(error);
            });
    }

    getUserById = (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(+id)) {
            return res.status(400).json({ message: "invalid id" })
        }

        this.userService.getUserById(+id)
            .then(user_id => {
                return res.status(200).json(user_id);
            })
            .catch((error:any) => {
                return res.status(400).json(error);
            });
        
    }

    createNewUser = (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        this.userService.createUser({ name, email, password })
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(400).json(error);
            });
    }

    refreshListUsers = (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, email } = req.body;

        if (isNaN(+id)) {
            return res.status(400).json({ message: "invalid id" })
        }
        this.userService.refreshList({ name, email }, +id)
            .then(user => {
                return res.status(200).json(user);
            })
            .catch(error => {
                return res.status(400).json(error);
            });
    }

    disableUser = (req: Request, res: Response) => {
        const { id } = req.params;

        if (isNaN(+id)) {
            return res.status(400).json({ message: "invalid id" })
        }

        this.userService.disableUser(+id)
            .then(user => {
                return res.status(200).json(user);
            })
            .catch(error => {
                return res.status(400).json(error);
            });
    }



}