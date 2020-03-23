import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { DateScalar } from '../common/scalars/date.scalar';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    DateScalar,
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UsersModule {}
