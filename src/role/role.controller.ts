import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './role.model';

@ApiTags('Роли')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Получение роли по значению' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
