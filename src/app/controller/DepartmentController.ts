import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import  authorize  from "../middeware/AuthMiddeware"
import { Roles } from "../util/rest/roles";
import { CreateDepartmentDto } from "../dto/CreatedepartmentDto";
import validationMiddleware from "../middeware/ValidationMiddleware";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`,
      authorize([Roles.ADMIN,Roles.HR,Roles.ENGINEER,Roles.MANAGER]), 
      this.departmentResponse);

    this.router.post(`${this.path}`, 
      authorize([Roles.ADMIN,Roles.HR]), 
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body) ,
      this.departmentCreate);

    this.router.put(`${this.path}/:id`, 
      authorize([Roles.ADMIN,Roles.HR]), 
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body), 
      this.departmentUpdate);

    this.router.delete(`${this.path}/:id`, 
      authorize([Roles.ADMIN,Roles.HR]),   
      this.departmentDelete);

  }


  private departmentResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send( await this.departmentService.getAllDepartment());
    } catch (error) {
      return next(error);
    }
  }

  private departmentCreate =  async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const departmentData : CreateDepartmentDto = request.body
      response.status(200);
      response.send( await this.departmentService.createDepartment(departmentData));
    } catch (error) {
      return next(error);
    }
  }

  private departmentUpdate =  async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const data : CreateDepartmentDto = request.body
      response.send( await this.departmentService.updateDepartment(request.params.id, data));
    } catch (error) {
      return next(error);
    }
  }

  private departmentDelete =  async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send( await this.departmentService.deleteDepartment(request.params.id));
    } catch (error) {
      return next(error);
    }
  }
}

export default DepartmentController;
