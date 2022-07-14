import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./AddressDto";



export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsEmail()
    public email: string;

    @IsString()
    public password: string;

    @IsString()
    public departmentId?: string;

    @ValidateNested({each: true})
    @Type(() => AddressDto)
    public address: AddressDto;

    
}