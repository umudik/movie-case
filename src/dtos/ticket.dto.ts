import { UserDto } from './user.dto';
import { SessionDto } from './session.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DateQueryDto, NumberQueryDto, StringQueryDto } from "./query.dto";
import { Prisma } from '@prisma/client';
export class TicketDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  status?: string;

  @ApiPropertyOptional({ type: Date })
  created_at?: Date;

  @ApiPropertyOptional({ type: Date })
  updated_at?: Date;

  @ApiPropertyOptional({ type: () => UserDto })
  User?: UserDto;

  @ApiPropertyOptional({ type: () => SessionDto })
  Session?: SessionDto;

  @ApiPropertyOptional({ type: Number })
  user_id?: number;

  @ApiPropertyOptional({ type: Number })
  session_id?: number;
}

export class TicketFilterDto implements Prisma.TicketWhereInput {
    @ApiProperty({ type: NumberQueryDto, required: false })
    id?: NumberQueryDto;
  
    @ApiProperty({ type: StringQueryDto, required: false })
    status?: StringQueryDto;
  
    @ApiProperty({ type: NumberQueryDto, required: false })
    user_id?: NumberQueryDto;
  
    @ApiProperty({ type: NumberQueryDto, required: false })
    session_id?: NumberQueryDto;
  
    @ApiProperty({ type: DateQueryDto, required: false })
    created_at?: DateQueryDto;
  
    @ApiProperty({ type: DateQueryDto, required: false })
    updated_at?: DateQueryDto;
  }

export class TicketUpdateDto {
    @ApiProperty({ type: TicketFilterDto })
    where:TicketFilterDto
  
    @ApiProperty({ type: TicketDto })
    data:TicketDto
  }