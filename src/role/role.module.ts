import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from './role.model';
import { User } from 'src/user/user.model';
import { UserRoles } from './user-role.model';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RoleService],
})
export class RoleModule {}
