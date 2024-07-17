
export class CreateRepairDTO {
    private constructor(
        public readonly date: string | Date,
        public readonly userId: number,
    ){}

    static create(object: { [key : string]: any }): [string?, CreateRepairDTO?] {
        const {date, userId} = object;
        if (!date) return ["date is required"]
        if (!userId) return ["userId is required"]

        return [undefined, new CreateRepairDTO(date, userId)];
    }


}