import { IsString } from "class-validator";


export class AddressDto{

    @IsString()
    public address: string;

    @IsString()
    public pin: string;
}

