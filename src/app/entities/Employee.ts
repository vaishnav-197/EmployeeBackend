import { Entity , Column  ,PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Address } from "./Address";
import { Department } from "./Department";


@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public name: string;

        @Column({ nullable: false})
        public password: string;

        @Column({nullable: false})
        public email: string

        @Column({nullable: true})
        public role: number

        @Column({ nullable: false })
        public departmentId: string;

        @ManyToOne(() => Department, { cascade: true })
        @JoinColumn()
        public department: Department;
        
        @OneToOne(()=> Address , {cascade: true})
        @JoinColumn()
        public address: Address;

        @Column({ nullable: true })
        public addressId: string;
}