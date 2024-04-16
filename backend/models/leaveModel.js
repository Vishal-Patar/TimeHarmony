import { Schema, model } from "mongoose";

const leaveSchema = Schema(
  {
    employeeId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Employee', 
      required: true 
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    reason: { 
      type: String, 
    },
    leaveType: { 
      type: Schema.Types.ObjectId, 
      ref: 'LeaveType', 
      required: true 
    },
    reportingManagerId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Employee', 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);

export default model("Leave", leaveSchema);