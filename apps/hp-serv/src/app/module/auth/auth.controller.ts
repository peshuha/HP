import {
  Body,
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuth, IUser} from '@vkr/hp-lib';
import { Public } from './auth.public';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
  constructor(
    private auth: AuthService,
    private usr: UserService
  ) {}

  @Public()
  @Post("login")
  async login(@Body() auth: IAuth) {
    console.log('AuthController::login', auth);
    return this.auth.signIn(auth.login, auth.password);
  }

  @Public()
  @Post("register")
  register(@Body() user: IUser) {
      return this.usr.create(user)
  }

}
