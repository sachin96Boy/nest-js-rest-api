import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  async signup(dto: AuthDto) {
    // generate password hash

    const hash = await argon2.hash(dto.password);
    // save new user in db

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },

        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      // return the saved user
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'p2002') {
          ('Credentials already Taken');
        }
      }
      throw err;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user not exist, throw exception

    if (!user) {
      throw new ForbiddenException('User Not Found');
    }

    // compare password
    // if password incorrect, throw exception

    const isPasswordVerify = await argon2.verify(user.password, dto.password);

    if (!isPasswordVerify) {
      throw new ForbiddenException('Passwords do not match');
    }

    // send back the user
    delete user.password;
    return user;
  }
}
