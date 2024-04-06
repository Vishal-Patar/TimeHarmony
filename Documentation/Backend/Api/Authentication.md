### Authentication:

#### 1. User Registration:
- **Endpoint:** `POST /api/auth/register`
- **Request Payload:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": "employee"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully."
  }
  ```

#### 2. User Login:
- **Endpoint:** `POST /api/auth/login`
- **Request Payload:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "user": {
      "userId": "user_id_here",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "employee"
    }
  }
  ```

#### 3. Request Password Reset:
- **Endpoint:** `POST /api/auth/reset-password-request`
- **Request Payload:**
  ```json
  {
    "email": "john@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Password reset request successful. Check your email for instructions."
  }
  ```

#### 4. Reset Password:
- **Endpoint:** `POST /api/auth/reset-password/:resetToken`
- **Request Payload:**
  ```json
  {
    "password": "new_secure_password"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Password reset successful."
  }
  ```
