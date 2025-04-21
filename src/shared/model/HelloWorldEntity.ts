import { BaseEntity } from "typeorm";
import { IEntity } from "../../infra/model/Entity";

export default class HelloWorldEntity extends BaseEntity implements IEntity {
    id: number;
}