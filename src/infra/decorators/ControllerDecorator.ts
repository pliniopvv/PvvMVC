import 'reflect-metadata';
import { container } from "../Kernel";
import GenericController from '../model/GenericController';
import { Logger } from 'logger';
import { Application } from 'express';

const controllers = [];
const logger = container.get("Logger") as Logger;
const app = container.get("App") as Application;

function ApiController<T extends object>(constructor: T & Function) {
    if (Reflect.getPrototypeOf(constructor) !== GenericController) {
        throw new Error('A classe deve extender GenericController');
    }
    logger.debug(`[@ApiController] ${constructor.name}`);

    const http = constructor.prototype;
    const name = constructor.name.replace("Controller", "").toLowerCase();
    if (http['list']) app.get(`/${name}/`, http['list'].bind(http));
    if (http['get']) app.get(`/${name}/:id`, http['get'].bind(http));
    if (http['post']) app.post(`/${name}/:id`, http['post'].bind(http));
    if (http['put']) app.put(`/${name}/:id`, http['put'].bind(http));
    if (http['delete']) app.delete(`/${name}/:id`, http['delete'].bind(http));

    const list = Object.getOwnPropertyNames(http);
    list.forEach((methodName) => {
        const method = http[methodName];
        const route = Reflect.getMetadata('route', method);
        if (route) {
            logger.debug(`[@${route.method[0].toUpperCase()}${route.method.substr(1)}|${constructor.name}] ${route.method.toUpperCase()} ${route.path} - ${methodName}()`);
            app[route.method as 'get' | 'post' | 'put' | 'delete'](route.path, method.bind(http));
        }
    });

    container.bind(constructor).toSelf();
    controllers.push(constructor);
    return constructor;
}

export function Get(path: string): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata('route', { method: 'get', path }, descriptor.value);
    };
}

export function Post(path: string): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata('route', { method: 'post', path }, descriptor.value);
    };
}

export function Put(path: string): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata('route', { method: 'put', path }, descriptor.value);
    };
}

export function Delete(path: string): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata('route', { method: 'delete', path }, descriptor.value);
    };
}

export default ApiController;