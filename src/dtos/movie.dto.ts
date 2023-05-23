import { SessionDto } from "./session.dto"
import { Movie } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class MovieDto implements Movie {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  age_restriction: number;

  @ApiProperty({ type: Date })
  created_at: Date;

  @ApiProperty({ type: Date })
  updated_at: Date;


}