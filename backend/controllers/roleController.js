import asyncHandler from "express-async-handler";
import Role from "../models/roleModel.js";

const createRole = asyncHandler(async (req, res) => {
  try {
    const { name, label, permissions } = req.body;

    // Check if the role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).send("Role already exists");
    }

    // Create a new role object with permissions
    const newRole = new Role({ name, label, permissions });
    await newRole.save();

    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating role");
  }
});

const getRoles = asyncHandler(async (req, res) => {
  try {
    // Fetch all roles from the database with name, label, and permissions
    const roles = await Role.find({}, "name label permissions");
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching roles");
  }
});

const deleteRole = asyncHandler(async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).send("Role not found");
    }
    res.status(200).json(deletedRole);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting role");
  }
});

const updateRole = asyncHandler(async (req, res) => {
  try {
    const { name, label, permissions } = req.body;

    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).send("Role not found");
    }

    // Update the role fields if they are provided in the request body
    if (name) {
      role.name = name;
    }
    if (label) {
      role.label = label;
    }
    if (permissions) {
      role.permissions = permissions;
    }

    // Save the updated role
    const updatedRole = await role.save();
    res.status(200).json(updatedRole);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating role");
  }
});

const getRoleByName = asyncHandler(async (req, res) => {
  try {
    const roleName = req.params.name;

    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(404).send("Role not found");
    }

    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching role");
  }
});

export { createRole, getRoles, deleteRole, updateRole, getRoleByName };
