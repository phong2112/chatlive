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

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
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
}
