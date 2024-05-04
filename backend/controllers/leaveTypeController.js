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
    const { name, label, description, allowedDays, status } = req.body;
    const leaveType = new LeaveType({
      name,
      label,
      description,
      allowedDays,
      status
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

const getLeaveTypeById = asyncHandler(async (req, res) => {
  try {
    const leaveType = await LeaveType.findById(req.params.id);
    if (!leaveType) {
      return res.status(404).json({ message: "LeaveType not found" });
    }
    res.status(200).json(leaveType);
  } catch (error) {
    console.error("Error getting leaveType:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const deleteLeaveType = asyncHandler(async (req, res) => {
  try {
    const deletedLeaveType = await LeaveType.findByIdAndDelete(req.params.id);
    if (!deletedLeaveType) {
      return res.status(404).json({ message: "LeaveType not found" });
    }
    res
      .status(200)
      .json({
        message: "LeaveType deleted successfully",
        leaveType: deletedLeaveType,
      });
  } catch (error) {
    console.error("Error deleting LeaveType:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const updateLeaveType = asyncHandler(async (req, res) => {
  try {
    const { name, label, description, allowedDays, status } = req.body;

    const leaveType = await LeaveType.findById(req.params.id);
    if (!leaveType) {
      return res.status(404).send("LeaveType not found");
    }

    // Update the leaveType fields if they are provided in the request body
    if (name) {
      leaveType.name = name;
    }
    if (label) {
      leaveType.label = label;
    }
    if (description) {
      leaveType.description = description;
    }
    if (allowedDays) {
      leaveType.allowedDays = allowedDays;
    }
    if (status !== undefined || status !== null) leaveType.status = status;

    // Save the updated leaveType
    const updatedLeaveType = await leaveType.save();
    res.status(200).json(updatedLeaveType);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating leaveType");
  }
});

export {
    getLeaveTypes,
    createLeaveType,
    getLeaveTypeById,
    deleteLeaveType,
    updateLeaveType
};
