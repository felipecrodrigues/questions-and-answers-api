import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class QuestionDTO {
    
    @IsInt()
    @IsOptional()
    @ApiProperty()
    Id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    Question: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    Answer: string;
}