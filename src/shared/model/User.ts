import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ModelEntity, RegisterEntity } from "../../infra/model/Entity";

@RegisterEntity
@Entity()
export class User extends ModelEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}