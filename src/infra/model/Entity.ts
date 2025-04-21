import { BaseEntity } from "typeorm";
import { container } from "../Kernel";
import { Logger } from "logger";

export interface IEntity {
    id: number;
}
export class ModelEntity extends BaseEntity implements IEntity {
    id: number;
}

const RegisteredEntities: Function[] = [];
const logger = container.get("Logger") as Logger;

function RegisterEntity<T extends object>(constructor: T & Function) {
    logger.debug(`[@RegisterEntity]: ${constructor.name}`);
    RegisteredEntities.push(constructor);
    return constructor;
}

export { RegisterEntity, RegisteredEntities };