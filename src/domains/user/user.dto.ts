import { ApiProperty } from '@nestjs/swagger';
import { DateQueryDto, NumberQueryDto, StringQueryDto } from "../../dtos/query.dto";
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
  @ApiProperty({ type: NumberQueryDto})
  id?: NumberQueryDto;

  @ApiProperty({ type: StringQueryDto})
  email?: StringQueryDto;

  @ApiProperty({ type: StringQueryDto})
  password?: StringQueryDto;

  @ApiProperty({ type: NumberQueryDto})
  age?: NumberQueryDto;

  @ApiProperty({ type: StringQueryDto})
  role?: StringQueryDto;

  @ApiProperty({ type: DateQueryDto})
  created_at?: DateQueryDto;

  @ApiProperty({ type: DateQueryDto})
  updated_at?: DateQueryDto;
}


export class UserUpdateDto {
  @ApiProperty({ type: UserFilterDto })
  where:UserFilterDto

  @ApiProperty({ type: UserDto })
  data:UserDto
}