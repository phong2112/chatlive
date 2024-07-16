import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'models/request/auth';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const { username, password } = signInDto;

    const user = await this.usersService.findOne({
      username,
      email: username,
    });

    if (!user || (user && user?.password !== password)) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      name: user.username,
      age: user.age,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1m',
      }),
    };
  }

  async profile(access_token: string) {
    const { username, test } = this.jwtService.decode(access_token);
    return {
      username,
      test,
    };
  }
}
