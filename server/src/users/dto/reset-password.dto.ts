import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty() // Specifies a regular column
  password: string;

  @ApiProperty() // Specifies a regular column
  verifyCode: string;
}
