import { MovieDto } from './movie.dto';
import { TicketDto } from './ticket.dto';
import { ApiProperty } from '@nestjs/swagger';
import { DateQueryDto, NumberQueryDto, StringQueryDto } from "./query.dto";
import { Prisma } from '@prisma/client';

export class SessionDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  date: Date;

  @ApiProperty({ type: String })
  time_slot: string;

  @ApiProperty({ type: Number })
  room_no: number;

  @ApiProperty({ type: Number })
  movie_id: number;

  @ApiProperty({ type: Date })
  created_at: Date;

  @ApiProperty({ type: Date })
  updated_at: Date;
}

export class SessionFilterDto implements Prisma.SessionWhereInput {
    @ApiProperty({ type: NumberQueryDto, })
    id?: NumberQueryDto;
  
    @ApiProperty({ type: DateQueryDto, })
    date?: DateQueryDto;
  
    @ApiProperty({ type: StringQueryDto, })
    time_slot?: StringQueryDto;
  
    @ApiProperty({ type: NumberQueryDto, })
    room_no?: NumberQueryDto;
  
    @ApiProperty({ type: NumberQueryDto, })
    movie_id?: NumberQueryDto;
  }

export class SessionUpdateDto {
    @ApiProperty({ type: SessionFilterDto })
    where:SessionFilterDto
  
    @ApiProperty({ type: SessionDto })
    data:MovieDto
  }