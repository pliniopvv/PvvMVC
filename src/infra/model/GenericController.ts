import { Request, Response } from "express";
import { IEntity } from "./Entity";
import GenericService from "./GenericService";

export default class GenericController<T extends IEntity> {
    private service: GenericService<T>;
    constructor (service: GenericService<T>) {
        this.service = service;
    }

    async list(req: Request, res: Response) {
        const entities = await this.service.findAll();
        return res.status(200).send(entities);
    }

    async get(req: Request, res: Response) {
        const id = this.getId(req);
        const entity = await this.service.findById(id);
        if (!entity) return res.status(404).send({ message: 'Not Found' });
        return res.status(200).send(entity);
    }

    async post(req: Request, res: Response) {
        const entity = this.TryGetBody(req);
        const createdEntity = await this.service.create(entity);
        return res.status(201).send(createdEntity);
    }

    async put(req: Request, res: Response) {
        const id = this.getId(req);
        const entity = this.TryGetBody(req);
        const updatedEntity = await this.service.update(id, entity);
        if (!updatedEntity) return res.status(404).send({ message: 'Not Found' });
        return res.status(200).send(updatedEntity);
    }

    async delete(req: Request, res: Response) {
        const id = this.getId(req);
        await this.service.delete(id);
        return res.status(204).send();
    }


    private getId(req: Request): number {
        const id = req.params.id;
        if (!id) throw new Error('ID not found');
        return parseInt(id);
    }

    private TryGetBody(req: Request): T {
        if (!req.body) throw new Error('Body not found');
        return req.body as T;
    }
}