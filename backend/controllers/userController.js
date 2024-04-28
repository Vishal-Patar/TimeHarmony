import asyncHandler from "express-async-handler";
import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import Employee from "../models/employeeModel.js";

//@desc Register a user
//@route POST /api/users/register
//@access public
const register = asyncHandler(async (req, res) => {
  const { username, email, password, role, status } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // Fetch the ObjectId for the provided role name or set the default as employee
  const roleObject = await Role.findOne({ name: role ?? "employee" });
  if (!roleObject) {
    return res.status(400).json({ error: "Role not found" });
  }

  //Hash password
  const hashedPassword = await hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: roleObject._id,
      status,
    });

    const user = await User.findById(newUser?._id).populate("role");
    if (user) {
      // Create the employee record linked to the user ID
      const employee = new Employee({ user: user._id, name: user.username });
      await employee.save();

      // After successul register login the user
      const accessToken = sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "15m" }
      );

      res.status(201).json({
        accessToken,
        user,
        employee,
        message: "Registered Successfully",
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
  } catch (error) {
    throw new Error(error);
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email }).populate("role");
  //compare password with hashedpassword
  if (user && (await compare(password, user.password))) {
    if (!user.status) {
      // Check if user status is not "active"
      res.status(403);
      throw new Error("User is not active. Please contact support.");
    }

    const accessToken = sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT
      // { expiresIn: "15m" }
    );

    const employee = await Employee.findOne({ user: user?.id });

    res.status(200).json({
      accessToken,
      user,
      employee,
      message: "Logged In Successfully",
    });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate("role");
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { username, email, password, role, status } = req.body;

  // Validate input fields
  if (!username || !email) {
    return res
      .status(400)
      .json({ error: "Username and email are mandatory fields." });
  }

  try {
    // Update user details
    let updatedUser = await User.findById(userId);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    if (username) updatedUser.username = username;
    if (email) updatedUser.email = email;
    if (role) updatedUser.role = role;
    if (status !== undefined || status !== null) updatedUser.status = status;

    // Update password if provided
    if (password) {
      updatedUser.password = await hash(password, 10);
    }

    await updatedUser.save();

    // Update associated employee record if exists
    const employee = await Employee.findOne({ user: userId });
    if (employee) {
      employee.name = username;
      await employee.save();
    }

    // Generate new access token after update

    res.status(200).json({
      user: updatedUser,
      employee,
      message: "User updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

export { register, login, currentUser, getUsers, getUserById, updateUser };
