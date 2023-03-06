import { AuthModule } from './../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/role/user-role.model';
import { RoleModule } from 'src/role/role.module';
import { Post } from 'src/post/post.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Post, Role, User, UserRoles]),
    RoleModule,
  ],
  exports: [UserService],
})
export class UserModule {}
