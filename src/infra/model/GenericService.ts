import { IEntity } from "./Entity";
import { GenericRepository } from "./GenericRepository";

export default class GenericService<T extends IEntity> {
    private repository: GenericRepository<T>;

    constructor(repository: GenericRepository<T>) {
        this.repository = repository;
    }

    public async findAll(): Promise<T[]> {
        return this.repository.findAll();
    }

    public async findById(id: number): Promise<T | null> {
        return await this.repository.find(id);
    }

    public async create(entity: T): Promise<T> {
        return await this.repository.save(entity);
    }

    public async update(id: number, entity: T): Promise<T | null> {
        return await this.repository.update(id, entity);
    }

    public async delete(id: number): Promise<void> {
        return await this.repository.delete(id);
    }
}