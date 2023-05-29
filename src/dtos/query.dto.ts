import { ApiProperty } from '@nestjs/swagger';

export class NumberQueryDto  {
    @ApiProperty({ type: Number })
    gt?: number

    @ApiProperty({ type: Number })
    gte?: number

    @ApiProperty({ type: Number })
    lte?: number

    @ApiProperty({ type: Number })
    le?: number

    @ApiProperty({ type: Number })
    equals?: number

    @ApiProperty({ type: Array<Number> })
    in?: number[]

    @ApiProperty({ type: Number })
    not?: number
}

export class StringQueryDto  {    
    @ApiProperty({ type: String })
    equals?: string
    
    @ApiProperty({ type: Array<String> })
    in?: string[]

    @ApiProperty({ type: String })
    not?: string
}


export class DateQueryDto  {
    @ApiProperty({ type: String })
    gt?: string
    
    @ApiProperty({ type: String })
    gte?: string
    
    @ApiProperty({ type: String })
    lte?: string
    
    @ApiProperty({ type: String })
    le?: string
    
    @ApiProperty({ type: String })
    equals?: string
    
    @ApiProperty({ type: Array<String> })
    in?: string[]
}

export class RelationQueryDto  {
    @ApiProperty({ type: Number })
    equals?: number
    
    @ApiProperty({ type: Array<Number> })
    in?: number[]
}



