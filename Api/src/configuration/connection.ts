import { Carrinho } from "../entity/ShoppingCart";
import { Carrinho_Cod_Produto_Produtos } from "../entity/carrinho_cod_produto_produtos";
import { CompraFinal } from "./../entity/CompraFinal";
import { createConnection } from "typeorm";
import { Imgs } from "../entity/Img";
import { Mercado } from "../entity/Mercado";
import { Produtos } from "../entity/Produtos";
import { User } from "../entity/User";


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
                    // Imgs,
                    Produtos,
                    Carrinho,
                    Carrinho_Cod_Produto_Produtos,
                    CompraFinal
                    
                ]
            }
        );
        console.log('Database   connected');
    }
}