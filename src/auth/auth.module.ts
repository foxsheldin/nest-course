import { UserModule } from './../user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
