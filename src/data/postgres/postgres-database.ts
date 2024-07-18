import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Repairs } from "./models/repairs.model";

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class PostgresDatabase {
  private datasource: DataSource;

  constructor(options: Options) {
    this.datasource = new DataSource({
      type: "postgres",
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      entities: [User, Repairs],
      synchronize: true,
    });
  }

  async connect() {
    try {
      await this.datasource.initialize();
      console.log("connected to database ");
    } catch (error) {
      console.log(error);
    }
  }
}
