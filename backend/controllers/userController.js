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
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: roleObject._id,
      status,
    }).populate("role");
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
    console.log("errpr", error);
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
    if (user.status !== "active") {
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

export { register, login, currentUser, getUsers };
