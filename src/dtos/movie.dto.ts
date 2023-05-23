import { Movie, Prisma } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';
import { DateQueryDto, NumberQueryDto, StringQueryDto } from "./query.dto";

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

export class MovieFilterDto implements Prisma.MovieWhereInput{
  @ApiProperty({ type: NumberQueryDto })
  id: NumberQueryDto;

  @ApiProperty({ type: StringQueryDto })
  name: StringQueryDto;

  @ApiProperty({ type: NumberQueryDto })
  age_restriction: NumberQueryDto;

  @ApiProperty({ type: DateQueryDto })
  created_at: DateQueryDto;

  @ApiProperty({ type: DateQueryDto })
  updated_at: DateQueryDto;
}

export class MovieUpdateDto {
  @ApiProperty({ type: MovieFilterDto })
  where:MovieFilterDto

  @ApiProperty({ type: MovieDto })
  data:MovieDto
}
