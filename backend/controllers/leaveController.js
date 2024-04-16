import asyncHandler from "express-async-handler";
import Designation from "../models/designationModel.js";
import Employee from "../models/employeeModel.js";
import Leave from "../models/leaveModel.js";

const applyLeave = asyncHandler(async (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const reportingManager = await Employee.findById(employee.reportingManager);
    if (!reportingManager) {
      return res.status(404).json({ error: 'Reporting manager not found' });
    }

    const leave = new Leave({
      employeeId,
      startDate,
      endDate,
      reason,
      reportingManagerId: reportingManager._id,
    });

    await leave.save();
    res.status(201).json({ message: 'Leave application submitted successfully', leave });
  } catch (error) {
    console.error('Error applying for leave:', error);
    res.status(500).json({ error: 'Error applying for leave' });
  }
});

const getLeaveRequests = asyncHandler(async (req, res) => {
  const { reportingManagerId } = req.query;
  try {
    const leaveRequests = await Leave.find({ reportingManagerId, status: 'pending' });
    res.json({ leaveRequests });
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ error: 'Error fetching leave requests' });
  }
});

const approveLeave = asyncHandler(async (req, res) => {
  const { leaveId } = req.params;
  try {
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ error: 'Leave not found' });
    }

    leave.status = 'approved';
    await leave.save();

    res.json({ message: 'Leave approved successfully', leave });
  } catch (error) {
    console.error('Error approving leave:', error);
    res.status(500).json({ error: 'Error approving leave' });
  }
});

const rejectLeave = asyncHandler(async (req, res) => {
  const { leaveId } = req.params;
  try {
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ error: 'Leave not found' });
    }

    leave.status = 'rejected';
    await leave.save();

    res.json({ message: 'Leave rejected successfully', leave });
  } catch (error) {
    console.error('Error rejecting leave:', error);
    res.status(500).json({ error: 'Error rejecting leave' });
  }
});

const getEmployeeLeaveRequests = asyncHandler(async (req, res) => {
  const { employeeId } = req.user; // Assuming the employee ID is available in the request's user object
  try {
    const employeeLeaveRequests = await Leave.find({ employeeId });
    res.json({ employeeLeaveRequests });
  } catch (error) {
    console.error('Error fetching employee leave requests:', error);
    res.status(500).json({ error: 'Error fetching employee leave requests' });
  }
});

export {
  applyLeave,
  getLeaveRequests,
  approveLeave,
  rejectLeave,
  getEmployeeLeaveRequests,
};
