import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middeware/ValidationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import  authorize  from "../middeware/AuthMiddeware"
import { Roles } from "../util/rest/roles";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import { AddressDto } from "../dto/AddressDto";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {

    this.router.get(`${this.path}`,
       authorize([Roles.ADMIN,Roles.HR,Roles.ENGINEER,Roles.MANAGER]),  
       this.employeeResponse);


    this.router.post(`${this.path}`,
       authorize([Roles.ADMIN,Roles.HR]),
       validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body) ,
       this.createEmployee);

    this.router.put(`${this.path}/:id`,
       authorize([Roles.ADMIN,Roles.HR]),
       validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body),
       this.updateEmployee);

    this.router.delete(`${this.path}/:id`,
       authorize([Roles.ADMIN,Roles.HR]),
       this.deleteEmployee);

    this.router.get(`${this.path}/:id`,
       authorize([Roles.ADMIN,Roles.HR,Roles.ENGINEER,Roles.MANAGER]),
       this.getEmployeeById);

    this.router.post(
      `${this.path}/login`,
      this.login
    );

    this.router.put(`${this.path}/:id/address`,
      authorize([Roles.ADMIN,Roles.HR]),
      this.updateAddress);

    // 
    
  }

  // login
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };


  private employeeResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      
      response.status(200);
      response.send(await this.employeeService.getAllEmployees());
    } catch (error) {
      return next(error);
    }
  }
  private createEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const employeeData : CreateEmployeeDto = request.body
      const data  = await this.employeeService.createEmployee(employeeData);
      response.status(200);
      response.send( data);
    } catch (error) {
      return next(error); 
    }
  }
  private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {

      const employeeData : UpdateEmployeeDto = request.body
      const data = await  this.employeeService.updateEmployee(request.params.id,employeeData)
      response.status(200);
      response.send(data );
    } catch (error) {
      return next(error); 
    }
  }
  private getEmployeeById =  async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {

      
      response.status(200);
      response.send( await this.employeeService.getEmployeeById(request.params.id));
      
    } catch (error) {
      return next(error); 
    }
  }

  private deleteEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {

      const data = await this.employeeService.deleteEmployee(request.params.id)
      response.status(200);
      response.send( data);
      
    } catch (error) {
      return next(error); 
    }
  }


  private updateAddress = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {

      const data : AddressDto = request.body
      response.status(200);
      response.send( await this.employeeService.UpdateAddress(request.params.id , data));
      
    } catch (error) {
      return next(error); 
    }
  }

}

export default EmployeeController;
