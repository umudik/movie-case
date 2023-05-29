import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: String, description: 'User Email' })
  email: string;

  @ApiProperty({ type: String, description: 'User Password' })
  password: string;
}


export class LoginResponseDto {
    @ApiProperty({ type: String, description: 'Token' })
    token: string;
  }
  