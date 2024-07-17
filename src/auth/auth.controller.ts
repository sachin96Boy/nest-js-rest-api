import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UseGuards(AuthGuard('jwt'))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signin(dto);
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}
