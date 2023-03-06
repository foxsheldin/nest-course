import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { Role } from './role.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @ApiProperty({ example: 'USER', description: 'Значение роли пользователя' })
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ForeignKey(() => User)
  @ApiProperty({ example: 'Пользователь', description: 'Описание роли' })
  @Column({ type: DataType.INTEGER })
  userId: number;
}
