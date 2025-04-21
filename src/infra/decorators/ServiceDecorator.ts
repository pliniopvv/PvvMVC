import 'reflect-metadata';
import { container } from "../Kernel";
import { Logger } from 'logger';
import GenericService from '../model/GenericService';

const services = [];
const logger = container.get("Logger") as Logger;

function InjectService<T extends object>(constructor: T & Function) {
    if (Reflect.getPrototypeOf(constructor) !== GenericService) {
        throw new Error('A classe deve extender GenericService');
    }
    logger.debug(`[@InjectService] ${constructor.name}`);
    container.bind(constructor).toSelf();
    services.push(constructor);
    return constructor;
}

export default InjectService;