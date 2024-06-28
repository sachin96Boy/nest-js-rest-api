import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin() {
    return this.authService.signin();
  }

  @Post('signup')
  async signup() {
    return this.authService.signup();
  }
}
