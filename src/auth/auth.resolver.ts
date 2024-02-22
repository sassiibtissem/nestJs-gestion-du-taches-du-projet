//bech iraje3 lel front
//'un résolveur GraphQL (AuthResolver) utilisé dans un service d'authentification (AuthService) avec NestJS
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth-guard';
import { LoginResponse } from './dto/loginResponse';
import { LoginUserInput } from './dto/login-user_input';
import { query } from 'express';
import { CurrentUser } from './current-user';
import { Profile } from 'passport';
import { JwtAuthGuard } from './jwt-auth-guard';
import { User } from 'src/users/entities/user.entity';
import { Users } from 'src/users/entities/usersSchema';
//@Resolver() :
//Décorateur indiquant que la classe AuthResolver est un résolveur GraphQL
@Resolver()
export class AuthResolver {
  

//Le constructeur prend une instance de AuthService en tant que dépendance injectée.
//Cette dépendance est utilisée pour accéder aux méthodes du service d'authentification 
//dans les méthodes du résolveur.
  constructor(private readonly authService: AuthService) {}
//Mutation(() => LoginResponse) :
//Décorateur indiquant que la méthode login est une mutation GraphQL qui renvoie un type LoginResponse.
//Une mutation est une opération qui modifie les données
  @Mutation(() => LoginResponse)
  //@UseGuards(GqlAuthGuard) :
///Décorateur indiquant que la méthode login utilise le garde GqlAuthGuard.
//Le garde est utilisé pour sécuriser la résolution de cette mutation.
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginAuthInput') loginUserInput: LoginUserInput) {
    let data = await this.authService.login(loginUserInput);
    console.log('login', data);
    return data;
  }  

  //to do test getUserByToken
  @Query(returns => User) // Assuming User is the return type
 
async getUserByToken(@Args('token') token: string): Promise<User> {
  const user = await this.authService.getUserByToken(token);
  console.log(token, 'token');
  return ;
}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  discount(@Args('_id') _id: string, @CurrentUser() profile: Profile) {
    let discount = this.authService.discount(_id);
  //   if (discount) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}}
