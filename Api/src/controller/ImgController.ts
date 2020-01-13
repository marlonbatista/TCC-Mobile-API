import { BaseController } from "./BaseController";
import { Imgs } from "../entity/Img";
import { Request } from 'express';

export class ImgsController extends BaseController<Imgs> {
    constructor() {
        super(Imgs);
    }

    async save(request: Request) {
        let _imgs = <Imgs>request.body;
        //vamos validar o que está vindo
        super.isRequired(_imgs.name, 'O nome da imagem é obrigatório ');
        super.isRequired(_imgs.routeLocation, 'O caminho da imagem é obrigatório');

        return super.save(_imgs, request);
    }
}