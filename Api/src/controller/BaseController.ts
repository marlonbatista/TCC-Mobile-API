
import { Repository, getRepository } from 'typeorm';
import { BaseNotification } from '../entity/BaseNotification';
import { Request } from 'express';


export abstract class BaseController<T> extends BaseNotification {

    private _repository: Repository<T>;
    private _onlyRootController: boolean = false;
    public errorRoot:any = {
        status: 401,
        errors: ['Você não está autorizado  a executar essa funcionabilidade']
    };
    
    constructor(entity: any, onlyRoot: boolean = false) {
        super();
        this._repository = getRepository<T>(entity);
        this._onlyRootController = onlyRoot;
    }

    private checkNotPermission(request:Request){
        return (this._onlyRootController && !request.IsRoot);
        
    }

    async all(request: Request) {
        //se o usuario precisar ser root mas ele não ser root
        if(this.checkNotPermission(request)) return this.errorRoot;
        return this._repository.find({
            where: {
                delete: false
            }
        });
    }

    async one(request: Request) {
        if(this.checkNotPermission(request)) return this.errorRoot;
        this.checkNotPermission(request);
        const id = request.params.id as string;
        return this._repository.findOne(id);
    }

    

    async save(model: any, request: Request,ignorePermission:boolean = false) {
        if(!ignorePermission)
            if(this.checkNotPermission(request)) return this.errorRoot;
       

        //se ela tiver um ID ela será apenas alterada
        if (model.id) {

             //dessa forma se o usuario tentar modificar esses parametros na mão, dará erro.
            // assim somente a api podera´ alterar esses dados.
            delete model['delete'];
            delete model['createAt'];
            delete model['updateAt'];

            const id = model.id as string;
            let _modelInDB = await this._repository.findOne(id)
            //assim verifico se ele está preenchido ou se está vazio ou diferente de null
            if (_modelInDB) {
                //Dessa forma se ele receber apenas o campo nome " o resto será autopreenchido com o que já tem no banco"
                Object.assign(_modelInDB, model)

            }
        }
        if (this.valid())
            return await this._repository.save(model);
        else
            return {
                status: 400,
                errors: this.allNotifications
            }
    }

    async remove(request: Request) {
        if(this.checkNotPermission(request)) return this.errorRoot;
        let id = request.params.id as string;
        let model: any;
        model = await this._repository.findOne(id);
        if (model) {
            model.delete = true;
            return await this._repository.save(model);
        }
        else {
            return {
                status: 404,
                errors: [
                    'Item não encontrado no banco de dados'
                ]
            }
        }

        //await this._repository.remove(request.params.id);
    }

    get repository(): Repository<T> {
        return this._repository;
    }
}