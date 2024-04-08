import asyncHandler from "express-async-handler";
import Department from "../models/departmentModel.js";

const getDepartments = asyncHandler(async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const createDepartment = asyncHandler(async (req, res) => {
  try {
    const { name, label } = req.body;
    const department = new Department({
      name,
      label,
    });
    await department.save();
    res
      .status(201)
      .json({ message: "Department created successfully", department });
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getDepartmentById = asyncHandler(async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error("Error getting department:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const deleteDepartment = asyncHandler(async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    res
      .status(200)
      .json({
        message: "Department deleted successfully",
        department: deletedDepartment,
      });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const updateDepartment = asyncHandler(async (req, res) => {
  try {
    const { name, label } = req.body;

    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).send("Department not found");
    }

    // Update the department fields if they are provided in the request body
    if (name) {
      department.name = name;
    }
    if (label) {
      department.label = label;
    }

    // Save the updated department
    const updatedDepartment = await department.save();
    res.status(200).json(updatedDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating department");
  }
});

export {
  getDepartments,
  createDepartment,
  getDepartmentById,
  deleteDepartment,
  updateDepartment
};
