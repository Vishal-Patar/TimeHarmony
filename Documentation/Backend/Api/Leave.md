### Leave Management:

#### Create Leave Request:
- **Endpoint:** `POST /api/leave-requests`
- **Request Payload:**
  ```json
  {
    "employeeId": "employee_id_here",
    "leaveType": "Annual Leave",
    "startDate": "2024-01-15",
    "endDate": "2024-01-20",
    "reason": "Vacation trip"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Leave request submitted successfully.",
    "leaveRequest": {
      "leaveRequestId": "new_leave_request_id",
      "employeeId": "employee_id_here",
      "leaveType": "Annual Leave",
      "startDate": "2024-01-15",
      "endDate": "2024-01-20",
      "reason": "Vacation trip",
      "approved": null,  // Set to null initially
      "allowedLeaves": 15,
      "takenLeaves": 0,
      "remainingLeaves": 15
    }
  }
  ```

  --
##### for whole day and custom hours

#### Create Leave Request:
- **Endpoint:** `POST /api/leave-requests`
- **Request Payload for Whole-Day Leave:**
  ```json
  {
    "employeeId": "employee_id_here",
    "leaveType": "Annual Leave",
    "startDate": "2024-01-15",
    "endDate": "2024-01-20",
    "reason": "Vacation trip"
  }
  ```
- **Response for Whole-Day Leave:**
  ```json
  {
    "success": true,
    "message": "Leave request submitted successfully.",
    "leaveRequest": {
      "leaveRequestId": "new_leave_request_id",
      "employeeId": "employee_id_here",
      "leaveType": "Annual Leave",
      "startDate": "2024-01-15",
      "endDate": "2024-01-20",
      "reason": "Vacation trip",
      "customHours": null,  // For whole-day leave, custom hours are null
      "allowedLeaves": 15,
      "takenLeaves": 0,
      "remainingLeaves": 15
    }
  }
  ```

- **Request Payload for Custom Hours Leave:**
  ```json
  {
    "employeeId": "employee_id_here",
    "leaveType": "Sick Leave",
    "startDate": "2024-02-10",
    "endDate": "2024-02-10",
    "reason": "Medical appointment",
    "customHours": {
      "start": "09:00 AM",
      "end": "01:00 PM"
    }
  }
  ```
- **Response for Custom Hours Leave:**
  ```json
  {
    "success": true,
    "message": "Leave request submitted successfully.",
    "leaveRequest": {
      "leaveRequestId": "new_leave_request_id",
      "employeeId": "employee_id_here",
      "leaveType": "Sick Leave",
      "startDate": "2024-02-10",
      "endDate": "2024-02-10",
      "reason": "Medical appointment",
      "customHours": {
        "start": "09:00 AM",
        "end": "01:00 PM"
      },
      "allowedLeaves": 15,
      "takenLeaves": 0,
      "remainingLeaves": 15
    }
  }
  ```
 if `customHours` is not provided, the system assumes it's a whole-day leave. If `customHours` is included, it's considered a leave for specific hours.

  --

#### Get All Leaves:
- **Endpoint:** `GET /api/leaves`
- **Response:**
  ```json
  [
    {
      "leaveId": "leave_id_1",
      "employeeId": "employee_id_here",
      "leaveType": "Sick Leave",
      "startDate": "2024-01-10",
      "endDate": "2024-01-12",
      "reason": "Not feeling well",
      "approved": true,  // Boolean flag for approval
      "allowedLeaves": 10,
      "takenLeaves": 3,
      "remainingLeaves": 7
    },
    // Other leaves...
  ]
  ```

#### Get All Leaves for a User:
- **Endpoint:** `GET /api/leaves/user/:userId`
- **Response:**
  ```json
  [
    {
      "leaveId": "leave_id_1",
      "leaveType": "Annual Leave",
      "startDate": "2024-01-15",
      "endDate": "2024-01-20",
      "reason": "Vacation trip",
      "approved": null,  // Set to null initially
      "allowedLeaves": 15,
      "takenLeaves": 5,
      "remainingLeaves": 10
    },
    // Other leaves for the user...
  ]
  ```

#### Approve Leave Request:
- **Endpoint:** `PUT /api/leave-requests/approve/:leaveRequestId`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Leave request approved successfully.",
    "leaveRequest": {
      "leaveRequestId": "leave_request_id_here",
      "employeeId": "employee_id_here",
      "leaveType": "Annual Leave",
      "startDate": "2024-01-15",
      "endDate": "2024-01-20",
      "reason": "Vacation trip",
      "approved": true,  // Set to true for approval
      "allowedLeaves": 15,
      "takenLeaves": 5,
      "remainingLeaves": 10
    }
  }
  ```

#### Reject Leave Request:
- **Endpoint:** `PUT /api/leave-requests/reject/:leaveRequestId`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Leave request rejected successfully.",
    "leaveRequest": {
      "leaveRequestId": "leave_request_id_here",
      "employeeId": "employee_id_here",
      "leaveType": "Annual Leave",
      "startDate": "2024-01-15",
      "endDate": "2024-01-20",
      "reason": "Vacation trip",
      "approved": false,  // Set to false for rejection
      "allowedLeaves": 15,
      "takenLeaves": 5,
      "remainingLeaves": 10
    }
  }
  ```

### Leave Type Management:

#### Create Leave Type:
- **Endpoint:** `POST /api/leave-types`
- **Request Payload:**
  ```json
  {
    "name": "Annual Leave",
    "allowedLeaves": 15
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Leave type created successfully.",
    "leaveType": {
      "leaveTypeId": "new_leave_type_id",
      "name": "Annual Leave",
      "allowedLeaves": 15
    }
  }
  ```

#### Get All Leave Types:
- **Endpoint:** `GET /api/leave-types`
- **Response:**
  ```json
  [
    {
      "leaveTypeId": "leave_type_id_1",
      "name": "Annual Leave",
      "allowedLeaves": 15
    },
    // Other leave types...
  ]
  ```

#### Get Leave Type by ID:
- **Endpoint:** `GET /api/leave-types/:leaveTypeId`
- **Response:**
  ```json
  {
    "leaveTypeId": "leave_type_id_here",
    "name": "Annual Leave",
    "allowedLeaves": 15
  }
  ```

#### Update Leave Type:
- **Endpoint:** `PUT /api/leave-types/:leaveTypeId`
- **Request Payload:**
  ```json
  {
    "allowedLeaves": 20
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Leave type updated successfully.",
    "leaveType": {
      "leaveTypeId": "leave_type_id_here",
      "name": "Annual Leave",
      "allowedLeaves": 20
    }
  }
  ``

`

#### Delete Leave Type:
- **Endpoint:** `DELETE /api/leave-types/:leaveTypeId`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Leave type deleted successfully."
  }
  ```

#### Get Leave Types with Leave Balances for a User:
- **Endpoint:** `GET /api/leave-types/user/:userId`
- **Response:**
  ```json
  [
    {
      "leaveTypeId": "leave_type_id_1",
      "name": "Annual Leave",
      "allowedLeaves": 15,
      "takenLeaves": 5,
      "remainingLeaves": 10
    },
    // Other leave types for the user...
  ]
  ```
