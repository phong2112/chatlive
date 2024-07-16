import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SignInDto {
  @IsOptional()
  @IsNotEmpty({ message: 'At least one of email or username is required' })
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsNotEmpty({ message: 'At least one of email or username is required' })
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
