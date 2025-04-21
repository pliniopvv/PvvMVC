import "reflect-metadata"
import { DataSource } from "typeorm"
import { RegisteredEntities } from "../model/Entity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: RegisteredEntities as any,
    migrations: [],
    subscribers: [],
});
