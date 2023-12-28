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

  async validateUser(email: string, password: string): Promise<any> {
    let user = await this.userService.findOne(email);

    if (!user) {
      // throw new HttpException(
      //   `${email} n'existe pas dans notre base de données`,
      // );
      throw new HttpException(
        `Nom d'utilisateur inexistant`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      // throw new UnauthorizedException(
      //   `Le mot de passe que vous avez saisi ne correspond pas à nos données`,
      // );
      throw new HttpException(
        'Mot de passe est incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (user) {
      const matchpassword = await bcrypt.compare(password, user.password);
      if (matchpassword) {
        const { password, ...result } = user;

        return result;
      }
    }
    // return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOne(loginUserInput.email);

    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign({
        sub: user._id,
        email: user.email,
      }),
      user,
    };
  }
}
