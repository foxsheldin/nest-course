import { AddRoleDto } from './dto/add-role.dto';
import { RoleService } from './../role/role.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userReopsitory: typeof User,
    private readonly roleService: RoleService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userReopsitory.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userReopsitory.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userReopsitory.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userReopsitory.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async ban(dto: BanUserDto) {
    const user = await this.userReopsitory.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
