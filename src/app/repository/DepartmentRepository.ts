import { getConnection, ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";

export class DepartmentRespository{
    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find({relations:['employee']});
    }

    async createDepartment(data : ObjectLiteral){
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(data);
   }

   async getDepartmentById(id:string){
    const departmentRepo = getConnection().getRepository(Department);
    const dept = departmentRepo.findOne(id,{relations:['employee']})
    return dept
    }


   async updateDepartment(id:string , data:ObjectLiteral){
    const departmentRepo = getConnection().getRepository(Department);
    return departmentRepo.update(id,data)
   }


   async deleteDepartment(id:string){
    const departmentRepo = getConnection().getRepository(Department);
          return departmentRepo.softDelete( id )
   }
    }