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

    async updateDepartment(id:string , data:CreateDepartmentDto){
        const dept = this.departmentRepository.getDepartmentById(id)
        if(dept){
            const dept : Department = plainToClass(Department , {
                name: data.name
            })
            return this.departmentRepository.updateDepartment(id,dept)
        }
    }

    async deleteDepartment(id:string ){
        const dept = this.departmentRepository.getDepartmentById(id)
        if(dept){
            const data = this.departmentRepository.deleteDepartment(id)
            return data
        }
    }

    }