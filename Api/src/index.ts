import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { Request, Response } from "express";
import { Routes } from "./routes";
import config from './configuration/config';
import auth from './middlaware/auth';
import auth2 from './middlaware/auth2';
import { User } from "./entity/User";
import connection from "./configuration/connection";

// create express app
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));


app.use(cors());
//antes dele ir para qualquer rota, o sistema verifica se as informações estão diferentes
app.use(auth||auth2);
// app.use(auth2);

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
            //result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            result.then(d => {
                console.log('passei', d);
                if (d && d.status)
                    //verificando se o id existe e d.status tbm existe ele retornara
                    //  dessa se a senha não bater com a confirmação de senha a api retornará status 400
                    res.status(d.status).send(d.message || d.errors);
                else if (d && d.file)
                    res.sendFile(d.file)

                else
                    res.json(d);

            })
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});


app.listen(config.port, '0.0.0.0', async () => {
    console.log(`Api initialize in port ${config.port}`);
    try {
        await connection.createConnection();

    } catch (error) {
        console.error(`Data base not connected`, error);
    }
})


