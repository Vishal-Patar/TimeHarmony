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
  console.log("Hashed Password: ", hashedPassword);
  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: roleObject._id,
      status,
    });
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

      res.status(201).json({ _id: user.id, email: user.email, accessToken });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
  } catch (error) {
    console.log("errpr", error);
    throw new Error(error);
  }
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await compare(password, user.password))) {
    const accessToken = sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      // { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
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
