export class CreateRepairDTO {
    
  private constructor(
    public readonly date: string | Date,
    public readonly userId: number,
    public readonly description: string,
    public readonly motorsNumber: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
    const { date, userId, description, motorsNumber } = object;
    if (!date) return ["date is required"];
    if (!userId) return ["userId is required"];
    if (!motorsNumber) return ["motorsNumber is required"];
    if (!description) return ["description is required"];
    if (description.length < 10)
      return ["description must be longer than 10 characters"];

    return [
      undefined,
      new CreateRepairDTO(date, userId, description, motorsNumber),
    ];
  }
}
