import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from 'src/auth/strategy';

@Module({
  imports: [PassportModule],
  controllers: [UsersController],
  providers: [UsersService, JWTStrategy],
})
export class UsersModule {}
