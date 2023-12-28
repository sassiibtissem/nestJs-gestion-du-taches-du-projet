import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth-guard';
import { LoginResponse } from './dto/loginResponse';
import { LoginUserInput } from './dto/login-user_input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginAuthInput') loginUserInput: LoginUserInput) {
    let data = await this.authService.login(loginUserInput);
    // console.log('login', data);
    return data;
  }
}
