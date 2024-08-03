import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  username?: string;

  @ApiProperty()
  age?: number;

  @ApiProperty() // Specifies a regular column
  firstname?: string;

  @ApiProperty() // Specifies a regular column
  lastname?: string;

  @ApiProperty() // Specifies a regular column
  email?: string;

  @ApiProperty() // Specifies a regular column
  password?: string;

  @ApiProperty() // Specifies a regular column
  resetToken?: string;
}
