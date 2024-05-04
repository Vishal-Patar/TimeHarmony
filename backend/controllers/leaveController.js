import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";
import Leave from "../models/leaveModel.js";
import LeaveType from "../models/leaveTypeModel.js";

const applyLeave = asyncHandler(async (req, res) => {
  const { employeeId, startDate, endDate, reason, leaveType } = req.body;
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
      leaveType,
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
  try {
    const leaveRequests = await Leave.find({ reportingManagerId: req.params.id })
      .populate("employeeId")
      .populate("leaveType")
      .sort({ createdAt: -1 });

    res.json(leaveRequests);
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ error: 'Error fetching leave requests' });
  }
});

const getAppliedLeaveRequests = asyncHandler(async (req, res) => {
  try {
    const leaveRequests = await Leave.find({ employeeId: req.params.id })
      .populate("employeeId")
      .populate("leaveType")
      .populate("reportingManagerId")
      .sort({ createdAt: -1 });

    res.json(leaveRequests);
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
  const { employeeId } = req.params;
  try {
    // Check if the employee has a reporting manager
    const employee = await Employee.findById(employeeId);
    if (!employee.reportingManager) {
      return res.json([]);
    }
    // Fetch all leave requests for the employee
    const leaveRequests = await Leave.find({ employeeId }).populate('leaveType');

    // Fetch leave types to get allowed days for each leave type with status true
    const leaveTypes = await LeaveType.find({ status: true });

    // Calculate used leave for each leave type
    const leaveData = leaveTypes.map((leaveType) => {
      const leaveTypeRequests = leaveRequests.filter((req) => req.leaveType._id.toString() === leaveType._id.toString());
      const usedDays = leaveTypeRequests.reduce((total, req) => total + Math.abs((req.endDate - req.startDate) / (1000 * 60 * 60 * 24)), 0);
      const availableDays = leaveType.allowedDays;
      const remainingDays = availableDays - usedDays;

      return {
        _id: leaveType._id,
        name: leaveType.name,
        label: leaveType.label,
        description: leaveType.description,
        allowedDays: leaveType.allowedDays,
        usedDays,
        availableDays,
        remainingDays,
      };
    });

    res.json(leaveData);
  } catch (error) {
    console.error('Error fetching employee leave data:', error);
    res.status(500).json({ error: 'Error fetching employee leave data' });
  }
});

export {
  applyLeave,
  getLeaveRequests,
  approveLeave,
  rejectLeave,
  getEmployeeLeaveRequests,
  getAppliedLeaveRequests
};
