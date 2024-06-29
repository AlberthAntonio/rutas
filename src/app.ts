import { envs } from "./config/env";
import { PostgresDatabase } from "./data/postgres/postgres-database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import "reflect-metadata"

(async() =>{
    main();
})()

async function main() {

    const postgres = new PostgresDatabase({
        host: envs.DB_HOST,
        port: envs.DB_PORT,
        username: envs.DB_USERNAME,
        password: envs.DB_PASSWORD,
        database: envs.DB_DATABASE
    })

    await postgres.connect();
    console.log('Connected to database');

    const server = new Server({ 
        port: 3020,
        routes: AppRoutes.routes
     })
    await server.start()
}