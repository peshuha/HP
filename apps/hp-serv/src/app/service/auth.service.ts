import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService} from "@nestjs/jwt"
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        private user: UserService,
        private jwt: JwtService
    ){}

    async signIn(login: string, psw: string): Promise<any> {
        const usr = await this.user.check(login, psw)
        if (!usr) {
          throw new UnauthorizedException();
        }

        const payload = { sub: usr._id, username: usr.login };
        return {
          access_token: await this.jwt.signAsync(payload),
        };
    }
}
