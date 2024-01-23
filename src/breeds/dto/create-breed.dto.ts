import { IsString, MinLength } from "class-validator";
import { Column } from "typeorm";

export class CreateBreedDto {
    @IsString()
    @MinLength(1)
    name: string;
}
