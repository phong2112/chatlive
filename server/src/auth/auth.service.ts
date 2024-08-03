import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'models/request/auth';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { v4 as uuidv4 } from 'uuid';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const { username, password } = signInDto;

    const user = await this.usersService.findOne({
      username,
      email: username,
    });

    const isValidPassword = await compare(password, user?.password);
    console.log(user, password, isValidPassword);

    if (!user || !isValidPassword) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
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

  async verifyCode(token: string) {
    try {
      const { secret, exp } = this.jwtService.decode(token);
      if (!secret || !exp) {
        return false;
      }
      const expirationTime = exp * 1000;
      const currentTime = Date.now();

      if (currentTime > expirationTime) {
        return false;
      }

      const user = this.usersService.findOne({
        resetToken: secret,
      });

      if (!user) {
        return false;
      }

      return true;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Invalid token',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Username or email is not found!',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const uid = uuidv4();
    const hashedSecret = await hash(uid, 10);
    const payload = {
      id: user?.id,
      secret: hashedSecret,
    };

    const resetToken = await this.jwtService.signAsync(payload, {
      expiresIn: '3m',
    });

    this.usersService.update(user?.id, {
      resetToken: hashedSecret,
    });

    this.emailService.sendResetPasswordLink({
      from: 'noreply@gmail.com',
      email: user?.email,
      subject: '[Chatlive] Reset Password',
      activationLink:
        'http://localhost:3000/auth/reset-password/?token=' + resetToken,
    });
  }

  async resetPassword(payload: ResetPasswordDto) {
    try {
      const isValidCode = this.verifyCode(payload?.verifyCode);
      const { id } = this.jwtService.decode(payload?.verifyCode);

      console.log(id, isValidCode, payload?.password);

      if (!isValidCode) {
        throw new Error('Invalid code');
      }
      const hashedPassword = await hash(payload.password, 10);
      payload.password = hashedPassword;

      const user = await this.usersService.update(id, {
        password: payload?.password,
        resetToken: null,
      });

      return user;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: err,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
