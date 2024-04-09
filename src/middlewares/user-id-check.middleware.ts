import { NestMiddleware, BadRequestException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

//verificar se o id existe no banco de dados, p´ra evitar conexão desnecessária com banco de dados

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserIdCheckMiddleware', 'antes');

    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('ID inválido!');
    }
    console.log('UserIdCheckMiddleware', 'depois');

    next();
  }
}
