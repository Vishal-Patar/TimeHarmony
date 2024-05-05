import asyncHandler from "express-async-handler";
import Attendance from "../models/attendaceModel.js";

const checkIn = asyncHandler(async (req, res) => {
    try {
        const { employeeId } = req.params;
        const checkInTime = new Date();

        // Create new attendance record
        const attendance = await Attendance.create({
            employee: employeeId,
            checkIn: checkInTime
        });

        res.status(200).json({ message: `Employee ${employeeId} checked in at ${checkInTime}` });
    } catch (error) {
        console.error('Error checking in employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const checkOut = asyncHandler(async (req, res) => {
    try {
        const { employeeId } = req.params;
        const checkOutTime = new Date();

        // Find latest attendance record for the employee
        const latestAttendance = await Attendance.findOne({ employee: employeeId }).sort({ createdAt: -1 });

        if (!latestAttendance) {
            return res.status(404).json({ error: 'No check-in record found for the employee' });
        }

        // Update the latest attendance record with check-out time
        latestAttendance.checkOut = checkOutTime;
        await latestAttendance.save();

        res.status(200).json({ message: `Employee ${employeeId} checked out at ${checkOutTime}` });
    } catch (error) {
        console.error('Error checking out employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const getAttendance = asyncHandler(async (req, res) => {
    try {
        const { employeeId } = req.params;

        // Find all attendance records for the employee
        const attendanceRecords = await Attendance.find({ employee: employeeId }).sort({ createdAt: -1 });;

        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance for employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const getAllAttendance = asyncHandler(async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('employee').sort({ createdAt: -1 });;
        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance for employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const isCheckIn = asyncHandler(async (req, res) => {
    try {
        const { employeeId } = req.params;

        // Find the latest attendance record for the employee
        const latestAttendance = await Attendance.findOne({ employee: employeeId }).sort({ checkIn: -1 });

        if (!latestAttendance || latestAttendance.checkOut) {
            // If no attendance record found or checked out, the employee is not checked in
            res.status(200).json({ isCheckIn: false });
        } else {
            // If a valid check-in record found, the employee is checked in
            res.status(200).json({ isCheckIn: true, attendance: latestAttendance });
        }
    } catch (error) {
        console.error('Error checking if employee is checked in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export {
    checkIn,
    checkOut,
    getAttendance,
    getAllAttendance,
    isCheckIn
};
