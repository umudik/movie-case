import { UserDto } from './user.dto';
import { SessionDto } from './session.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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