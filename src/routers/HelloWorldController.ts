import GenericController from "../infra/model/GenericController";
import HelloWorldEntity from "../shared/model/HelloWorldEntity";
import ApiController, { Get } from "../infra/decorators/ControllerDecorator";
import { Request, Response } from "express";

@ApiController
export default class HelloWorldController extends GenericController<HelloWorldEntity> {

    @Get('/testando')
    async testando(req: Request,res: Response){
        res.send('Olha aí a rota aí, óh.');
    }
}