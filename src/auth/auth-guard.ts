//hedhi bech tverifi si token valid walla
//guard maj3oul bech yblockik walla y5alik tet3ada c tt
//kifeh bech ya5ilk tet3ada walla yebloukik b token teb3ath wa9t li 3mlt enti login , yemchi fi blasa esmha headers , el request tetkwen men headers, body w barcha hajet okhrin
//hedhek 3leh ena marra lokhra gotlk a3ml console lel variables li declaré fi guards li 3andek

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  //JwtService pour travailler avec les JWT,
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

//Cette méthode canActivate est appelée automatiquement par NestJS lorsqu'une requête est reçue par le serveur.
    async canActivate(context: ExecutionContext): Promise<boolean> {
      //context.switchToHttp().getRequest() récupère l'objet de requête HTTP à partir du contexte d'exécution.
      const request = context.switchToHttp().getRequest();
      //this.extractTokenFromHeader(request) extrait le token JWT de l'en-tête de la requête.
      const token = this.extractTokenFromHeader(request);
      //Si aucun token n'est trouvé, une exception UnauthorizedException est levée,
      // indiquant que l'utilisateur n'est pas autorisé.
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        //La méthode tente ensuite de vérifier la validité du token en utilisant this.jwtService.verifyAsync. /
        //Si la vérification réussit, le payload du token est assigné à request['user'], 
        //ce qui permet d'accéder aux informations de l'utilisateur dans les gestionnaires de route ultérieurs.
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      //Si une exception est levée pendant la vérification (par exemple, en cas de token invalide), une exception UnauthorizedException est levée.
//La méthode renvoie true pour indiquer que la requête est autorisée à accéder à la route protégée.
      return true;
    }
  //Méthode extractTokenFromHeader :
//Cette méthode privée extrait le token JWT de l'en-tête Authorization de la requête.
//Elle utilise la désignation "Bearer" pour extraire le token. Si l'en-tête d'autorisation n'est pas présent 
//ou ne suit pas le format "Bearer {token}", la méthode renvoie undefined.
//Sinon, elle renvoie le token extrait
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      console.log('token',token)
      return type === 'Bearer' ? token : undefined;
     
    }
  }