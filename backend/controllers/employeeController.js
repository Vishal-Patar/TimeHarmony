import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";

const getEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("user")
      .populate("designation")
      .populate("department");

    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const createEmployee = asyncHandler(async (req, res) => {
  try {
    const { user, name, address, department /* other employee details */ } =
      req.body;
    const employee = new Employee({
      user,
      name,
      address,
      department /* other employee details */,
    });
    await employee.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getEmployeeById = asyncHandler(async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("designation")
      .populate("department");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error getting employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      message: "Employee deleted successfully",
      employee: deletedEmployee,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const updateEmployee = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      address,
      designation,
      department /* other employee details */,
    } = req.body;

    // Create an update object with the fields to be updated
    const updateObj = {};
    if (name) updateObj.name = name;
    if (address) updateObj.address = address;
    if (designation) updateObj.designation = designation;
    if (department) updateObj.department = department;
    // Add other fields to updateObj as needed

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export {
  getEmployees,
  createEmployee,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
};
