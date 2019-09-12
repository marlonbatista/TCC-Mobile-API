import { createConnection } from "typeorm";
import { User } from "../entity/User";
import { Mercado } from "../entity/Mercado";
import { Imgs } from "../entity/Img";
import { Produtos } from "../entity/Produtos";
import { Carrinho } from "../entity/ShoppingCart";


const cfg = require('../../ormconfig.json');

export default {

    createConnection: async () => {
        await createConnection(
            {
                type: cfg.type,
                host: cfg.host,
                port: cfg.port,
                username: cfg.username,
                password: cfg.password,
                database: cfg.database,
                synchronize: true,
                logging: false,
                entities: [
                    //Aqui vem todoas as tabelas que o banco cria ou conecta quando faz a conexão
                    User,
                    Mercado,
                    Imgs,
                    Produtos,
                    Carrinho,
                   
                    
                ]
            }
        );
        console.log('Database   connected');
    }
}