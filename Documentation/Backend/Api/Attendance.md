### Attendance Management:

- **Check-In:**
  - **Endpoint:** `POST /api/attendance/check-in`
  - **Request Payload:**
    ```json
    {
      "employeeId": "employee_id_here",
      "checkInTime": "2024-01-15T09:00:00"
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Check-in successful.",
      "attendanceRecord": {
        "attendanceId": "new_attendance_id",
        "employeeId": "employee_id_here",
        "checkInTime": "2024-01-15T09:00:00",
        "checkOutTime": null
      }
    }
    ```

- **Check-Out:**
  - **Endpoint:** `POST /api/attendance/check-out/:attendanceId`
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Check-out successful.",
      "attendanceRecord": {
        "attendanceId": "attendance_id_here",
        "employeeId": "employee_id_here",
        "checkInTime": "2024-01-15T09:00:00",
        "checkOutTime": "2024-01-15T17:00:00"
      }
    }
    ```

- **Get Attendance for a User:**
  - **Endpoint:** `GET /api/attendance/user/:userId`
  - **Response:**
    ```json
    [
      {
        "attendanceId": "attendance_id_1",
        "checkInTime": "2024-01-15T09:00:00",
        "checkOutTime": "2024-01-15T17:00:00"
      },
      // Other attendance records for the user...
    ]
    ```

- **Get Attendance for a User within a Day:**
  - **Endpoint:** `GET /api/attendance/user/:userId/day`
  - **Query Parameters:** `date` (e.g., "2024-01-15")
  - **Response:**
    ```json
    [
      {
        "attendanceId": "attendance_id_1",
        "checkInTime": "2024-01-15T09:00:00",
        "checkOutTime": "2024-01-15T17:00:00"
      },
      // Other attendance records for the user on the specified day...
    ]
    ```

- **Get Attendance for a User within a Week:**
  - **Endpoint:** `GET /api/attendance/user/:userId/week`
  - **Query Parameters:** `startDate` and `endDate` (e.g., "2024-01-15" to "2024-01-21")
  - **Response:**
    ```json
    [
      {
        "attendanceId": "attendance_id_1",
        "checkInTime": "2024-01-15T09:00:00",
        "checkOutTime": "2024-01-15T17:00:00"
      },
      // Other attendance records for the user within the specified week...
    ]
    ```

- **Get Attendance for a User within a Month:**
  - **Endpoint:** `GET /api/attendance/user/:userId/month`
  - **Query Parameters:** `year` and `month` (e.g., "2024-01")
  - **Response:**
    ```json
    [
      {
        "attendanceId": "attendance_id_1",
        "checkInTime": "2024-01-15T09:00:00",
        "checkOutTime": "2024-01-15T17:00:00"
      },
      // Other attendance records for the user within the specified month...
    ]
    ```

- **Get Attendance for a User within a Date Range:**
  - **Endpoint:** `GET /api/attendance/user/:userId/range`
  - **Query Parameters:** `startDate` and `endDate`
  - **Response:**
    ```json
    [
      {
        "attendanceId": "attendance_id_1",
        "checkInTime": "2024-01-15T09:00:00",
        "checkOutTime": "2024-01-15T17:00:00"
      },
      // Other attendance records for the user within the specified date range...
    ]
    ```

- **Get Attendance Summary for a User:**
  - **Endpoint:** `GET /api/attendance/user/:userId/summary`
  - **Response:**
    ```json
    {
      "totalDays": 20,
      "presentDays": 15,
      "absentDays": 5
    }
    ```

- **Update Check-In Time:**
  - **Endpoint:** `PUT /api/attendance/check-in/:attendanceId`
  - **Request Payload:**
    ```json
    {
      "checkInTime": "2024-01-15T09:30:00"
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Check-in time updated successfully.",
      "attendanceRecord": {
        "attendanceId": "attendance_id_here",
        "employeeId": "employee_id_here",
        "checkInTime": "2024-01-15T09:30:00",
        "checkOutTime": "2024-01-15T17:00:00"
      }
    }
    ```

- **Update Check-Out Time:**
 

 - **Endpoint:** `PUT /api/attendance/check-out/:attendanceId`
  - **Request Payload:**
    ```json
    {
      "checkOutTime": "2024-01-15T17:30:00"
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Check-out time updated successfully.",
      "attendanceRecord": {
        "attendanceId": "attendance_id_here",
        "employeeId": "employee_id_here",
        "checkInTime": "2024-01-15T09:30:00",
        "checkOutTime": "2024-01-15T17:30:00"
      }
    }
    ```

- **Delete Attendance Record:**
  - **Endpoint:** `DELETE /api/attendance/:attendanceId`
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Attendance record deleted successfully."
    }
    ```
