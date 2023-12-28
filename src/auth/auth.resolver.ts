import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { loginResponse } from './dto/loginResponse';
import { loginUserInput } from './dto/login-user_input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => loginResponse)
  login(@Args('loginUserInput') loginUserInput: loginUserInput) {
    return this.authService.login(loginUserInput);
  }

}