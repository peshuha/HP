import { Module } from '@nestjs/common';
import { User, UserSchema } from '../../model/user/user.mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], "user")
    ],
    controllers: [
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})
export class UserModule {}
