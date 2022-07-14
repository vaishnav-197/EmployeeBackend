import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./AddressDto";



export class UpdateEmployeeDto {
    @IsString()
    @IsOptional()
    public name?: string;

    @IsEmail()
    @IsOptional()
    public email?: string;

    @IsString()
    @IsOptional()
    public password?: string;

    @IsString()
    @IsOptional()
    public departmentId?: string;

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => AddressDto)
    public address?: AddressDto;

    
}