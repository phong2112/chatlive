import { ApiProperty } from '@nestjs/swagger';

export class EmailActivationUserDto {
  @ApiProperty()
  from: string;

  @ApiProperty()
  email: string;

  @ApiProperty() // Specifies a regular column
  subject?: string;

  @ApiProperty() // Specifies a regular column
  activationLink?: string;
}
