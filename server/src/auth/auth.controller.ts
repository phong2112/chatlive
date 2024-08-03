import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { RealIP } from 'nestjs-real-ip';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { SignInDto } from 'models/request/auth';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { EmailActivationUserDto } from 'src/users/dto/email-user.dto';
import { ForgotPasswordDto } from 'src/users/dto/forgot-password.dto';
import { hash } from 'bcrypt';
import { VerifyResetCodeDto } from 'src/users/dto/verify-reset-code.dto';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private emailService: EmailService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: SignInDto })
  signIn(@Body() payload: SignInDto) {
    return this.authService.signIn(payload);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    const authorizationHeader = req.headers['authorization'];

    const tokenParts = authorizationHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      // Handle case where Authorization header format is incorrect
      throw new Error('Invalid Authorization header format');
    }

    const accessToken = tokenParts[1];
    return this.authService.profile(accessToken);
  }

  @Get('ip')
  getIpAddressFromRequest(@RealIP() ip: string): string {
    return ip;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiBody({ type: CreateUserDto })
  register(@Body() payload: CreateUserDto) {
    return this.userService.register(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sendEmail')
  @ApiBody({ type: EmailActivationUserDto })
  sendEmail(@Body() payload: EmailActivationUserDto) {
    return this.emailService.sendResetPasswordLink({
      ...payload,
      activationLink: 'http://localhost:3000/auth/login',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgotPassword')
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassWord(@Body() payload: ForgotPasswordDto) {
    const { email } = payload;

    return this.authService.forgotPassword(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verifyCode')
  @ApiBody({ type: VerifyResetCodeDto })
  async verifyCode(@Body() payload: VerifyResetCodeDto) {
    const { token } = payload;

    return this.authService.verifyCode(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('resetPassword')
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() payload: ResetPasswordDto) {
    return this.authService.resetPassword(payload);
  }
}
