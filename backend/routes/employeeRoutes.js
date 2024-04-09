import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from "../controllers/employeeController.js";
const employeeRoutes = Router();

employeeRoutes.get("/", getEmployees);
employeeRoutes.post("/create", createEmployee);
employeeRoutes.delete("/:id", deleteEmployee);
employeeRoutes.patch("/:id", updateEmployee);
employeeRoutes.get("/:id", getEmployeeById);

export default employeeRoutes;
