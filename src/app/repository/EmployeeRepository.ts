
import { getConnection, ObjectLiteral } from "typeorm";
import { Address } from "../entities/Address";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
         const employee = getConnection().getRepository(Employee);
        return employee.find({relations:['department' , 'address']});
    }

    async createEmployees(data : Employee)  {
         const employee = getConnection().getRepository(Employee);
         return employee.save(data);
    }

    async updateEmployee(id:string ,data : Employee){
          const employee = getConnection().getRepository(Employee);
          return employee.update({ id } , data)
    }

    async getEmployeeById(id: string){
     const employee = getConnection().getRepository(Employee);
     return employee.findOne( id , {relations:['department' , 'address']})
     }   


    public async getEmployeeByName(username: string) {
          const employeeRepo = getConnection().getRepository(Employee);
          const employeeDetail = await employeeRepo.findOne({
              where: { name:username },
          });
          return employeeDetail;
     }

    async deleteEmployee(Id: string){
          const employee = getConnection().getRepository(Employee);
          return employee.softDelete( Id )
          
          }  
    
    async updateEmployeeAddress(Id: string , data: Address){
     const address = getConnection().getRepository(Address);
     return address.update({ id :Id }  , data)
     
     }  
    }

    
