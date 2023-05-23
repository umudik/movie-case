import { ApiProperty } from '@nestjs/swagger';
import { DateQueryDto, NumberQueryDto, StringQueryDto } from "./query.dto";
import { Prisma } from '@prisma/client';

export class UserDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: Number })
  age: number;

  @ApiProperty({ type: String })
  role: string;

  @ApiProperty({ type: Date })
  created_at: Date;

  @ApiProperty({ type: Date })
  updated_at: Date;

}


export class UserFilterDto implements Prisma.UserWhereInput {
  @ApiProperty({ type: NumberQueryDto, required: false })
  id?: NumberQueryDto;

  @ApiProperty({ type: StringQueryDto, required: false })
  email?: StringQueryDto;

  @ApiProperty({ type: StringQueryDto, required: false })
  password?: StringQueryDto;

  @ApiProperty({ type: NumberQueryDto, required: false })
  age?: NumberQueryDto;

  @ApiProperty({ type: StringQueryDto, required: false })
  role?: StringQueryDto;

  @ApiProperty({ type: DateQueryDto, required: false })
  created_at?: DateQueryDto;

  @ApiProperty({ type: DateQueryDto, required: false })
  updated_at?: DateQueryDto;
}


export class UserUpdateDto {
  @ApiProperty({ type: UserFilterDto })
  where:UserFilterDto

  @ApiProperty({ type: UserDto })
  data:UserDto
}