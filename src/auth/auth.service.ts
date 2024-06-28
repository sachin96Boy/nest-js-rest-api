import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return {
      msg: 'user signed up',
    };
  }

  signin() {
    return {
      msg: 'user signed in',
    };
  }
}
