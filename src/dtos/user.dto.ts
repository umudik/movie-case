import { TicketDto } from './ticket.dto';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ isArray: true, type: () => TicketDto })
  Ticket: TicketDto[];
}