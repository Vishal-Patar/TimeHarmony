import { Router } from "express";
import { createDesignation, deleteDesignation, getDesignationById, getDesignations, updateDesignation } from "../controllers/designationController.js";
const designationRoutes = Router();

designationRoutes.get("/", getDesignations);
designationRoutes.post("/", createDesignation);
designationRoutes.delete("/:id", deleteDesignation);
designationRoutes.patch("/:id", updateDesignation);
designationRoutes.get("/:id", getDesignationById);

export default designationRoutes;
