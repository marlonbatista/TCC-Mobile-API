import { Response, Request } from 'express';
import { Mercado } from "./../entity/Mercado";
import { verify } from 'jsonwebtoken';
import config from "../configuration/config";
import { getRepository, Repository } from 'typeorm';

export default async (req: Request, res: Response, next: Function) => {

  let token = req.body.token || req.query.token || req.headers['x-token-access'];
  let publicRoutes = <Array<String>>config.publicRoutes;
  let isPublicRoute: boolean = false;
  let _mercadoRepository: Repository<Mercado> = getRepository(Mercado);

  publicRoutes.forEach(url => {
    let isPublic = req.url.includes(url);
    if (isPublic)
      isPublicRoute = true;
  });

  if (isPublicRoute)
    next();
  else
    if (token) {
      try {
        
        let _mercadoAuth = verify(token, config.secretyKey);
        req.userAuth = _mercadoAuth;

        let _mercadoDB = await _mercadoRepository.findOne({ where: { id: _mercadoAuth.id } });
        req.IsRoot = _mercadoDB.isRoot;

        next();
      } catch (error) {
        res.status(401).send({ message: 'Token informado é inválido' });
        return;
      }
    } else {
      res.status(401).send({ message: 'Para acessar esse recurso você precisa estar autenticado' });
      return;
    }

}