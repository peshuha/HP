import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User, UserDocument } from '../../model/user/user.mongo';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.public';
import { jwtConstants } from '../../config/jwt.constant';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private usr: UserService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    // Сначала смотрим не публичный ли это метод
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    // На время тестов указываем тестового юзера
    req['__user'] = {
      _id: "xxx"
    }
    // console.log("AuthGuard::canActivate", req['__user'])
    return true;

    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwt.verify(token, {
        secret: jwtConstants.secret,
      });

      // Устанавливаем контекст для дальнейшего использования
      const id = payload.sub;
      const usr = <UserDocument>await this.usr.getByIdAsync(id);
      console.log('AuthGuard>>usr', usr);
      // Убираем пароль
      const { password, ...other } = usr.toObject();
      req['__user'] = other;
      console.log('AuthGuard>>payload', req['__user']);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log('extractTokenFromHeader', request.headers['authorization']);
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
