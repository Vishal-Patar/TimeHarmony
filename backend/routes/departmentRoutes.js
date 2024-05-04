import { Router } from "express";
import { createDepartment, deleteDepartment, getDepartmentById, getDepartments, updateDepartment } from "../controllers/departmentController.js";
const departmentRoutes = Router();

departmentRoutes.get("/", getDepartments);
departmentRoutes.post("/", createDepartment);
departmentRoutes.delete("/:id", deleteDepartment);
departmentRoutes.patch("/:id", updateDepartment);
departmentRoutes.get("/:id", getDepartmentById);

export default departmentRoutes;
