import { AuthService } from './auth.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('registration')
  @UsePipes(ValidationPipe)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
