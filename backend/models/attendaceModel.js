import { Schema, model } from "mongoose";

const attendanceSchema = Schema(
    {
        employee: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
            required: true
        },
        checkIn: {
            type: Date,
            required: true
        },
        checkOut: {
            type: Date
        },
    },
    {
        timestamps: true,
    }
);

export default model("Attendance", attendanceSchema);