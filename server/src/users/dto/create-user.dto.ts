import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  age?: number;

  @ApiProperty() // Specifies a regular column
  firstname?: string;

  @ApiProperty() // Specifies a regular column
  lastname?: string;

  @ApiProperty() // Specifies a regular column
  email: string;

  @ApiProperty() // Specifies a regular column
  password?: string;
}
