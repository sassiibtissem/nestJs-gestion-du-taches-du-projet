//Le service d'authentification (AuthService) est responsable de la gestion de l'authentification 
//le service d'authentification gère le processus d'authentification, 
//y compris la validation des informations d'identification lors de la connexion et la génération d'un token JWT
// lorsqu'un utilisateur réussit à se connecter. 
//Ces fonctionnalités sont courantes dans les services d'authentification, 
//où la sécurité et la protection des données des utilisateurs sont des préoccupations majeures
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { CreateAuthInput, LoginAuthInput } from './dto/create-auth.input';
// import { UpdateAuthInput } from './dto/update-auth.input';
// import { ProfileService } from 'src/profile/profile.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user_input';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
//Utilise le service userService pour trouver un utilisateur avec l'email fourni.
  async validateUser(email: string, password: string): Promise<any> {
    let user = await this.userService.findOne(email);
//Si l'utilisateur n'existe pas, une exception HttpException est levée avec un statut HTTP UNAUTHORIZED.
    if (!user) {
      // throw new HttpException(
      //   `${email} n'existe pas dans notre base de données`,
      // );
      throw new HttpException(
        `Nom d'utilisateur inexistant`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    //le mot de passe fourni est comparé avec le mot de passe haché stocké dans la base de données à l'aide de bcrypt.
    const matchPassword = await bcrypt.compare(password, user.password);
    //Si les mots de passe ne correspondent pas, une exception HttpException est levée.
    if (!matchPassword) {
      // throw new UnauthorizedException(
      //   `Le mot de passe que vous avez saisi ne correspond pas à nos données`,
      // );
      throw new HttpException(
        'Mot de passe est incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
//Si l'utilisateur et le mot de passe sont valides, le mot de passe est retiré des données de l'utilisateur ({ password, ...result }) 
//et ces données sont renvoyées
    if (user) {
      const matchpassword = await bcrypt.compare(password, user.password);
      if (matchpassword) {
        const { password, ...result } = user;

        return result;
      }
    }
   
  }




  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOne(loginUserInput.email);

    const { password, ...result } = user;

    return {
      //Un token JWT est généré en utilisant le service jwtService.sign, avec le sous-jet (sub) défini comme l'ID de l'utilisateur et l'email de l'utilisateur.
//La méthode renvoie un objet contenant le token d'accès et les données de l'utilisateur (à l'exception du mot de passe)
      access_token: this.jwtService.sign({
        // sub: user._id,
        email: user.email,
      }),
      user,
    };
  }
  //pour récupérer les informations de l'utilisateur à partir d'un token JWT
  
  
  getUserByToken(token){

  }
  discount(par){}
    
  }
  
