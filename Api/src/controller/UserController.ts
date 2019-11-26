import { Request } from 'express';
import { User } from "../entity/User";
import { BaseController } from "./BaseController";
import { sign } from 'jsonwebtoken';
import config from "../configuration/config";
import * as md5 from 'md5';
import { FileHelper } from '../helpers/fileHelper';

export class UserController extends BaseController<User> {

    constructor() {
        super(User);
    }

    async auth(request: Request) {

        let { email, password } = request.body;
        if (!email || !password)
            return { status: 400, message: 'Informe o email e a senha para efetuar o login' };

        let user = await this.repository.findOne({ email: email, password: md5(password) });
        if (user) {
            let _payload = {
                id: user.id,
                name: user.name,
                card: user.cardNumber,
                email: user.email
            }
            return {
                status: 200,
                message: {
                    user: _payload,
                    token: sign({
                        ..._payload,
                        tm: new Date().getTime()
                    }, config.secretyKey)
                }
            }
        } else
            return { status: 404, message: 'E-mail ou senha inválidos' }
    }

    async createUser(request: Request) {
        let { name, lastname, city, phone, celphone, cpf, rg, nasc, cardNumber, SafyNumber, photo, isRoot, sex, email, password, ConfirmPassword } = request.body;

        super.isRequired(name, 'O nome do usúario é obrigatório ');
        super.isRequired(lastname, 'O Sobrenome é obrigatório');
        super.isRequired(city, 'A Cidade é obrigatória');
        super.isRequired(phone, 'O telefone é obrigatório');
        super.isRequired(celphone, 'O Celular é obrigatório');
        super.isRequired(photo, 'A foto é obrigatória');
        super.isRequired(cpf, 'O CPF é obrigatório');
        super.isRequired(rg, 'O RG é obrigatório');
        super.isRequired(nasc, 'A Data de Nascimento é obrigatória');
        super.isRequired(cardNumber, 'O Número do cartão é obrigatório');
        super.isRequired(SafyNumber, 'O Código de Segurança é obrigatório');
        super.isRequired(sex, 'A escolha do sexo é obrigatória');
        super.isRequired(email, 'O email deve ser válido');
        super.isRequired(password, 'A senha é obrigatória');
        super.isRequired(ConfirmPassword, 'Informe a confirmação da asenha');
        
        let _user = new User();
        const Email = await this.repository.findOne({
            email:email
        })
        if(Email){
            return {status: 404, message:['E-mail já cadastrado!']};
        }
        else{
            _user.email = email;
            console.log('E-mail livre!')
        }

        _user.name = name;
        _user.lastname = lastname;
        _user.city = city;
        _user.phone = phone;
        _user.photo = photo;
        _user.celphone = celphone;
        _user.cpf = cpf;
        _user.rg = rg;
        _user.nasc = nasc;
        _user.cardNumber = cardNumber;
        _user.SafyNumber = SafyNumber;
        _user.sex = sex;
        _user.email = email;

        
        


        if (password != ConfirmPassword)
            return { status: 400, errors: ['A senha  e a confirmação são diferente'] }

        if (password)

            _user.password = md5(password);
        _user.cardNumber = md5(cardNumber);
        _user.SafyNumber = md5(SafyNumber);

        _user.isRoot = isRoot;


        return super.save(_user, request, true);
    }

    async TestaCPF(strCPF) {

    }
    async save(request: Request) {
        let _user = <User>request.body;
        let id = await this.repository.findOne(_user.id)
        //vamos validar o que está vindo

        _user.id = id.id
        super.isRequired(_user.name, 'O nome do usúario é obrigatório ');
        super.isRequired(_user.lastname, 'O Sobrenome é obrigatório');
        super.isRequired(_user.city, 'A Cidade é obrigatória');
        super.isRequired(_user.phone, 'O telefone é obrigatório');
        super.isRequired(_user.celphone, 'O Celular é obrigatório');
        // super.isRequired(_user.photo,'A foto é obrigatória');
        super.isRequired(_user.cpf, 'O CPF é obrigatório');
        super.isRequired(_user.rg, 'O RG é obrigatório');
        super.isRequired(_user.nasc, 'A Data de Nascimento é obrigatória');
        super.isRequired(_user.cardNumber, 'O Número do cartão é obrigatório');
        super.isRequired(_user.SafyNumber, 'O Código de Segurança é obrigatório');
        super.isRequired(_user.sex, 'A escolha do sexo é obrigatória');
        super.isRequired(_user.email, 'O email deve ser válido');
        super.isRequired(_user.password, 'A senha é obrigatória');

        if (_user.password==id.password){

            _user.password = id.password;
        }else{
            _user.password = md5(_user.password)
        }
        return super.save(_user, request);
    }

}