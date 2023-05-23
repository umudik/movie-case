import { MovieDto } from './movie.dto';
import { TicketDto } from './ticket.dto';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ type: () => MovieDto })
  Movie: MovieDto;

  @ApiProperty({ isArray: true, type: () => TicketDto })
  Ticket: TicketDto[];
}