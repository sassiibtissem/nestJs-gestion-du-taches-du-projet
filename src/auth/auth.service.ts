
import { loginUserInput } from './dto/login-user_input';

import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password === password) {
      // Destructure user object to exclude the password
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
  async login(loginUserInput: loginUserInput) {
    const user = await this.usersService.findOne(loginUserInput.email);
    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user._id }), // implemente jwt
      user,
    };
  }
  async singnup(loginUserInput: loginUserInput) {
    const user = await this.usersService.findOne(loginUserInput.email);
    if (user) {
      throw new error('user is already exist');
    }
  }
}
