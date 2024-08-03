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
import { Request } from 'express';
import { RealIP } from 'nestjs-real-ip';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { SignInDto } from 'models/request/auth';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  //   @ApiTags('auth')
  //   @HttpCode(HttpStatus.OK)
  //   @Get('login')
  //   @ApiBody({ type: SignInDto })
  //   signIn(@Body() signInDto: SignInDto, @Req() req: Request) {
  //     const userAgent = req.headers['user-agent'] || '';
  //     return this.authService.signIn(signInDto.username, signInDto.password);
  //   }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @ApiBody({ type: CreateUserDto })
  signIn(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
