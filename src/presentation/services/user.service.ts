import { User } from "../../data";

enum UserRol {
    EMPLOYEE = "EMPLOYEE",
    CLIENT = "CLIENT"
}

enum UserStatus {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED"
}

export class UserService {

    constructor() {

    }

    async getAllUsers() {
        try {
            const users = await User.find({
                where: {
                    status: UserStatus.ACTIVE
                }
            })
            return users;
        } catch (error: any) {
            throw new Error('internal server error')
        }
    }

    async getUserById(id: number) {
        try {
            const user = await User.findOne({
                where: {
                    id: id,
                    status: UserStatus.ACTIVE
                }
            })
            if (!user){
                throw new Error("User already exists")
            }
            return user;
        } catch (error: any) {
            throw new Error('internal server error')
        }
    }

    async createUser(userData: any) {
        const user = new User();

        user.name = userData.name.toLowerCase().trim();
        user.email = userData.email.toLowerCase().trim();
        user.password = userData.password.trim();
        user.rol = userData.CLIENT;
        user.status = userData.ACTIVE;
        try {
            return await user.save();
        } catch (error) {
            console.log(error)
        }
    }

    async refreshList(userData:any ,id: number) {
        const user = await this.getUserById(id);
        user.name = userData.name.toLowerCase().trim();
        user.email = userData.email.toLowerCase().trim();

        try {
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('internal server error')
        }
    }

    async disableUser(id: number) {
        const user = await this.getUserById(id);

        user.status = UserStatus.DISABLED;
        try {
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('internal server error')
        } 
    }
    
}