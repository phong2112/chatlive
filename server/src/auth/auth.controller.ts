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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInRequest, @Req() req: Request) {
    const userAgent = req.headers['user-agent'] || '';
    console.log('User Agent:', userAgent);
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @Get('ip')
  getIpAddressFromRequest(@RealIP() ip: string): string {
    return ip;
  }

  @Get('find')
  findAll(@Req() req: Request) {
    const userAgent = req.headers['user-agent'] || '';
    console.log('User Agent:', userAgent);
    console.log(req);
  }
}
