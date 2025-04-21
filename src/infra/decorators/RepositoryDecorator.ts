import 'reflect-metadata';
import { container } from "../Kernel";
import { Logger } from 'logger';
import GenericService from '../model/GenericService';
import { GenericRepository } from '../model/GenericRepository';

const repositorys = [];
const logger = container.get("Logger") as Logger;

function InjectRepository<T extends object>(constructor: T & Function) {
    if (Reflect.getPrototypeOf(constructor) !== GenericRepository) {
        throw new Error('A classe deve extender GenericRepository');
    }
    logger.debug(`[@InjectRepository] ${constructor.name}`);
    container.bind(constructor).toSelf();
    repositorys.push(constructor);
    return constructor;
}

export default InjectRepository;