import asyncHandler from "express-async-handler";
import LeaveType from "../models/leaveTypeModel.js";

const getLeaveTypes = asyncHandler(async (req, res) => {
  try {
    const leaveType = await LeaveType.find();
    res.status(200).json(leaveType);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const createLeaveType = asyncHandler(async (req, res) => {
  try {
    const { name, label, description, allowedDays } = req.body;
    const leaveType = new LeaveType({
      name,
      label,
      description,
      allowedDays
    });
    await leaveType.save();
    res
      .status(201)
      .json({ message: 'Leave type created successfully', leaveType });
  } catch (error) {
    console.error('Error creating leave type:', error);
    res.status(500).json({ error: 'Error creating leave type' });
  }
});

// const getDepartmentById = asyncHandler(async (req, res) => {
//   try {
//     const department = await Department.findById(req.params.id);
//     if (!department) {
//       return res.status(404).json({ message: "Department not found" });
//     }
//     res.status(200).json(department);
//   } catch (error) {
//     console.error("Error getting department:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// const deleteDepartment = asyncHandler(async (req, res) => {
//   try {
//     const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
//     if (!deletedDepartment) {
//       return res.status(404).json({ message: "Department not found" });
//     }
//     res
//       .status(200)
//       .json({
//         message: "Department deleted successfully",
//         department: deletedDepartment,
//       });
//   } catch (error) {
//     console.error("Error deleting department:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// const updateDepartment = asyncHandler(async (req, res) => {
//   try {
//     const { name, label } = req.body;

//     const department = await Department.findById(req.params.id);
//     if (!department) {
//       return res.status(404).send("Department not found");
//     }

//     // Update the department fields if they are provided in the request body
//     if (name) {
//       department.name = name;
//     }
//     if (label) {
//       department.label = label;
//     }

//     // Save the updated department
//     const updatedDepartment = await department.save();
//     res.status(200).json(updatedDepartment);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error updating department");
//   }
// });

export {
    getLeaveTypes,
    createLeaveType,
};
