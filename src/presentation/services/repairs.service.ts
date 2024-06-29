import { Repairs, User } from "../../data";

enum RepairsStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

export class RepairsService {

    constructor() {

    }

    async getPendingRepairs() {
        try {
            const repairs = await Repairs.findOne({
                where: {
                    status: RepairsStatus.PENDING
                }
            })
            return repairs;
        } catch (error:any) {
            throw new Error('internal server error')
        }

    }

    async getpendingRepairsByUserId(userId: number) {
        try {
            const repairs = await Repairs.findOne({
                where: {
                    user_id: userId,
                    status: RepairsStatus.PENDING
                }
            })
            if (!repairs){
                throw new Error("User already exists")
            }
            return repairs;
        } catch (error:any) {
            throw new Error('internal server error')
        }
    }

    async createRepairs(repairData: any) {
        const repair = new Repairs();

        repair.date = repairData.date;
        repair.status = RepairsStatus.PENDING;
        repair.user_id = repairData.userId;
        try {
            return await repair.save();
        } catch (error) {
            console.log(error)
        }
    }

    async updateRepairs( id: number) {
        const repair = await this.getpendingRepairsByUserId(id);

        repair.status = RepairsStatus.COMPLETED;
        try {
            return await repair.save();
        } catch (error) {
            console.log(error)
        }
    }        

    async cancelRepairs(id: number) {
        const repair = await this.getpendingRepairsByUserId(id);

        repair.status = RepairsStatus.CANCELLED;
        try {
            return await repair.save();
        } catch (error) {
            console.log(error)
        }
    }

    
}