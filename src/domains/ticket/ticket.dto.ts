import { UserDto } from '../user/user.dto';
import { SessionDto } from '../session/session.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DateQueryDto, NumberQueryDto, StringQueryDto } from "../../dtos/query.dto";
import { Prisma , Ticket} from '@prisma/client';

export class TicketDto implements Prisma.TicketCreateInput  { 
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  status?: string;

  @ApiPropertyOptional({ type: Date })
  created_at?: Date;

  @ApiPropertyOptional({ type: Date })
  updated_at?: Date;

  @ApiPropertyOptional({ type: Number })
  user_id?: number;

  @ApiPropertyOptional({ type: Number })
  session_id?: number;
}

export class TicketFilterDto implements Prisma.TicketWhereInput {
    @ApiProperty({ type: NumberQueryDto })
    id?: NumberQueryDto;
  
    @ApiProperty({ type: StringQueryDto })
    status?: StringQueryDto;
  
    @ApiProperty({ type: NumberQueryDto })
    user_id?: NumberQueryDto;
  
    @ApiProperty({ type: NumberQueryDto })
    session_id?: NumberQueryDto;
  
    @ApiProperty({ type: DateQueryDto })
    created_at?: DateQueryDto;
  
    @ApiProperty({ type: DateQueryDto })
    updated_at?: DateQueryDto;
  }

export class TicketUpdateDto {
    @ApiProperty({ type: TicketFilterDto })
    where:TicketFilterDto
  
    @ApiProperty({ type: TicketDto })
    data:TicketDto
  }