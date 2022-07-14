/**
 * Wraps Controllers for easy import from other modules
 */
import HealthController from "./HealthController";
import EmployeeController from "./EmployeeController";
import { EmployeeService } from "../service/EmployeeService";
import DepartmentController from "./DepartmentController";
import { DepartmentService } from "../service/DepartmentService";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { DepartmentRespository } from "../repository/DepartmentRepository";

export default [
  new HealthController(),
  new EmployeeController(new EmployeeService( new EmployeeRespository)),
  new DepartmentController(new DepartmentService( new DepartmentRespository)),
];
