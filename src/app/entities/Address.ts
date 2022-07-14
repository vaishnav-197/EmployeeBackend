import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";


@Entity("address")
export class Address extends AbstractEntity {
    
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public address: string;    


    @Column({ nullable: false })
    public pin: string;    
}