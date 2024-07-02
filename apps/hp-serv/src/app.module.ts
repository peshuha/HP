import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './app/module/auth/auth.guard';
import { jwtConstants } from './app/config/jwt.constant';
import { AuthModule } from './app/module/auth/auth.module';
import { UserModule } from './app/module/user/user.module';
import { ProdnumModule } from './app/module/prodnum/prodnum.module';
import { HpModule } from './app/module/hp/hp.module';
import { RoomModule } from './app/module/room/room.module';
import { ViewModule } from './app/module/view/view.module';

@Module({
  imports: [
    // JWT Security
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '2h',
      },
    }),
    // БД Пользователей
    MongooseModule.forRoot('mongodb://localhost:27017/user', {
      connectionName: 'user',
    }),
    // БД Витрин (комнат)
    MongooseModule.forRoot('mongodb://localhost:27017/room', {
      connectionName: 'room',
    }),
    // БД Заказов
    MongooseModule.forRoot('mongodb://localhost:27017/order', {
      connectionName: 'order',
    }),
    UserModule,
    AuthModule,
    ProdnumModule,
    HpModule,
    RoomModule,
    ViewModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
