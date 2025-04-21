import { Database } from "sqlite3";
import { container } from "../Kernel";
import { IEntity } from "./Entity";
import { DataSource, FindOptionsWhere, Repository } from "typeorm";

export class GenericRepository<T extends IEntity> {
    private repository: Repository<T>;

    constructor(private entity: T&Function) {
        this.repository = container.get(DataSource).getRepository(this.entity);
    }

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async find(id: number): Promise<T | null> {
        return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
    }

    async update(id: number, model: T): Promise<T> {
        model.id = id;
        await this.repository.update({ id } as FindOptionsWhere<T>, model as any);
        return model;
    }

    async save(model: T): Promise<T> {
        return await this.repository.save(model);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}