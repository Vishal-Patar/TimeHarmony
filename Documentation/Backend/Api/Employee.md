### Employee Management:

#### Get All Employees:
- **Endpoint:** `GET /api/employees`
- **Response:**
  ```json
  [
    {
      "employeeId": "employee_id_1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "123-456-7890",
      "department": "IT",
      "position": "Software Engineer",
      "workingHours": {
        "start": "09:00 AM",
        "end": "05:00 PM"
      }
    },
    // Other employees...
  ]
  ```

####  Get Employee by ID:
- **Endpoint:** `GET /api/employees/:employeeId`
- **Response:**
  ```json
  {
    "employeeId": "employee_id_here",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "123-456-7890",
    "department": "IT",
    "position": "Software Engineer",
    "workingHours": {
      "start": "09:00 AM",
      "end": "05:00 PM"
    }
  }
  ```

####  Create Employee:
- **Endpoint:** `POST /api/employees`
- **Request Payload:**
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phoneNumber": "987-654-3210",
    "department": "HR",
    "position": "HR Specialist",
      "workingHours": {
        "start": "09:00 AM",
        "end": "05:00 PM"
      }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Employee created successfully.",
    "employee": {
      "employeeId": "new_employee_id",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "phoneNumber": "987-654-3210",
      "department": "HR",
      "position": "HR Specialist",
      "workingHours": {
        "start": "09:00 AM",
        "end": "05:00 PM"
      }
    }
  }
  ```

####  Update Employee:
- **Endpoint:** `PUT /api/employees/:employeeId`
- **Request Payload:**
  ```json
  {
    "phoneNumber": "999-888-7777",
    "position": "Senior Software Engineer"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Employee updated successfully.",
    "employee": {
      "employeeId": "employee_id_here",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "999-888-7777",
      "department": "IT",
      "position": "Senior Software Engineer"
    }
  }
  ```

####  Delete Employee:
- **Endpoint:** `DELETE /api/employees/:employeeId`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Employee deleted successfully."
  }
  ```
