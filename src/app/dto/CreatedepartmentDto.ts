import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./AddressDto";



export class CreateDepartmentDto {
    @IsString()
    public name: string;
    
}