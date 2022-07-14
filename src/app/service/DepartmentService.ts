import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { CreateDepartmentDto } from "../dto/CreatedepartmentDto";
import { Department } from "../entities/Department";
import { DepartmentRespository } from "../repository/DepartmentRepository";

export class DepartmentService{

    constructor(private departmentRepository: DepartmentRespository) {
        
    }
    async getAllDepartment(){
        const departmentResp =  await this.departmentRepository.getAllDepartments()
        return departmentResp;
    }

    async createDepartment(data : CreateDepartmentDto){
        const dept : Department = plainToClass(Department , {
            name: data.name
        })
        const departmentrepo = await this.departmentRepository.createDepartment(dept)
        return departmentrepo;
    }

    async updateDepartment(id:string , data:ObjectLiteral){
        const dept = this.departmentRepository.getDepartmentById(id)
        if(dept){
            return this.departmentRepository.updateDepartment(id,data)
        }
    }
    }