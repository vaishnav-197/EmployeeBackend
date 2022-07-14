

import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from 'bcrypt'
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from 'jsonwebtoken'
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import { AddressDto } from "../dto/AddressDto";
import { Address } from "../entities/Address";

export class EmployeeService{

    constructor(private employeeRepository: EmployeeRespository) {
        
      }


    async getAllEmployees(){
        const employeeResp = await this.employeeRepository.getAllEmployees()
        return employeeResp;
    }
    
    // async createEmployee(data : CreateEmployeeDto){
    //     const createEmployee = await this.employeeRepository.createEmployees(data)
    //     return createEmployee
    // }


    public async createEmployee(employeeDetails: CreateEmployeeDto) {
        try {
            const newEmployee : Employee = plainToClass(Employee, {
                name: employeeDetails.name,
                password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                email:employeeDetails.email,
                // age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                // isActive: true,
                address:{
                    address: employeeDetails.address.address,
                    pin: employeeDetails.address.pin
                }
            });
            const save = await this.employeeRepository.createEmployees(newEmployee);
            return save;
        } catch (err) {
            // throw new HttpException(400, "Failed to create employee");
        }
    }


    async updateEmployee(Id:string, employeeDetails : UpdateEmployeeDto){
      
      const getEmployee  = await this.employeeRepository.getEmployeeById(Id);
      if(!getEmployee){
        throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
      } 
        const UpdatedEmployee : Employee = plainToClass(Employee, {
        name: employeeDetails.name,
        password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
        email:employeeDetails.email,
        departmentId: employeeDetails.departmentId,
      });
        const updateEmployee = await this.employeeRepository.updateEmployee(Id ,UpdatedEmployee)
        return updateEmployee
    }

    async deleteEmployee(Id : string){
         const getEmployee  = await this.employeeRepository.getEmployeeById(Id);
         if(!getEmployee){
             throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
         }
         else{
            const deleteEmployee = await this.employeeRepository.deleteEmployee(Id)
            return deleteEmployee
         }

        
    }

    async getEmployeeById(Id:string  ){
        const getEmployee  = await this.employeeRepository.getEmployeeById(Id);
        if(!getEmployee){
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        else{
            return getEmployee;
        }
        
    }

    async UpdateAddress(Id:string , data: AddressDto){
      const getEmployee  = await this.employeeRepository.getEmployeeById(Id);
      if(!getEmployee){
          throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
      }
      else{
          const address : Address = plainToClass(Address, {
            address: data.address,
            pin: data.pin ,
          });
          const updatedAddress = await this.employeeRepository.updateEmployeeAddress( getEmployee.address.id , address)
          return updatedAddress
      }
    }


    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepository.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "custom:role":employeeDetails.role,
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
    }