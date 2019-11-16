import { BaseController } from "./BaseController";
import { Request } from 'express';
import *  as md5 from 'md5';
import { Mercado } from "../entity/Mercado";
import config from "../configuration/config";
import { sign } from 'jsonwebtoken';
import { FileHelper } from "../helpers/fileHelper";

export class MercadoController extends BaseController<Mercado>{
    constructor(){
        super(Mercado);
    }
    
    async auth(request: Request) {

        let { email, password } = request.body;
        if (!email || !password)
            return { status: 400, message: 'Informe o email e a senha para efetuar o login' };

        let mercado = await this.repository.findOne({ email: email, password: md5(password) });
        if (mercado) {
            let _payload = {
                id:mercado.id,
                name: mercado.name,
                RazaoSocial:mercado.RazaoSocial,
                email: mercado.email,
                photo:mercado.photo
            }
            return {
                status: 200,
                message: {
                    mercado: _payload,
                    token: sign({
                        ..._payload, 
                        tm: new Date().getTime()
                    }, config.secretyKey)
                }
            }
        } else
            return { status: 404, message: 'E-mail ou senha inválidos' }
    }

    async save(request:Request){
        let _mercado = <Mercado>request.body;
        
        super.isRequired(_mercado.name, 'O nome do mercado é obrigatório');
        super.isRequired(_mercado.RazaoSocial, 'A razão social é requirida!')
        super.isRequired(_mercado.city, 'A cidade deve ser informada!')
        super.isRequired(_mercado.phone, 'O telefone deve ser informado!')
        super.isRequired(_mercado.cnpj, 'O cnpj deve ser informado!')
        super.isRequired(_mercado.email, 'O email deve ser informado!')
        super.isRequired(_mercado.state, 'O Estado deve ser informado!')
        super.isRequired(_mercado.zipCode, 'O CEP deve ser informado!')
        super.isRequired(_mercado.address, 'O endereço deve ser informado!')
        super.isRequired(_mercado.photo, 'O logo da loja deve ser informado!')
        super.isRequired(_mercado.password, 'A senha deve ser informada!')

         if (_mercado.photo) {
            let pictureCreatedResult = await FileHelper.writePicture(_mercado.photo)
            if (pictureCreatedResult)
            _mercado.photo = pictureCreatedResult
          }
        
        return super.save(_mercado,request);
        
    }

    async createMercado(request: Request){
        let {name,photo,city,phone,state,cnpj,zipCode,RazaoSocial,codprocontrole,address,addressComplement,isRoot,email,password,ConfirmPassword} = request.body;
        
        super.isRequired(name, 'O nome do mercado é obrigatório');
        super.isRequired(RazaoSocial, 'A razão social é requirida!')
        super.isRequired(city, 'A cidade deve ser informada!')
        super.isRequired(phone, 'O telefone deve ser informado!')
        super.isRequired(cnpj, 'O cnpj deve ser informado!')
        super.isRequired(email, 'O email deve ser informado!')
        super.isRequired(state, 'O Estado deve ser informado!')
        super.isRequired(zipCode, 'O CEP deve ser informado!')
        super.isRequired(address, 'O endereço deve ser informado!')
        // super.isRequired(codprocontrole, 'O código de controle deve ser informada!')
        super.isRequired(photo, 'O logo da loja deve ser informado!')
        super.isRequired(password, 'A senha deve ser informada!')        
        // super.isRequired(password,"Informe sua senha");
        super.isRequired(ConfirmPassword,"A confirmação da senha é obrigatória");
        super.isTrue(password != ConfirmPassword, 'A senha e a confirmação de senha estão diferentes');
        
        let _mercado = new Mercado();

        _mercado.name = name;
        _mercado.RazaoSocial = RazaoSocial; 
        _mercado.city = city;
        _mercado.phone = phone;
        _mercado.photo = photo;
        _mercado.email = email;
        _mercado.state = state;
        _mercado.cnpj = cnpj;
        _mercado.zipCode = zipCode;
        _mercado.address = address;
        _mercado.addressComplement = addressComplement;
        _mercado.email = email;

        if (_mercado.photo) {
            let pictureCreatedResult = await FileHelper.writePicture(_mercado.photo)
            if (pictureCreatedResult)
            _mercado.photo = pictureCreatedResult
          }
        if(password != ConfirmPassword)
            return {status:400, errors: ['A senha  e a confirmação são diferente'] }

                if(password)

                    _mercado.password = md5(password);


        _mercado.isRoot = isRoot;


        return super.save(_mercado,request,true);
    }
    
}