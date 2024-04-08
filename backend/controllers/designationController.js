import asyncHandler from "express-async-handler";
import Designation from "../models/designationModel.js";

const getDesignations = asyncHandler(async (req, res) => {
  try {
    const designations = await Designation.find();
    res.status(200).json(designations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const createDesignation = asyncHandler(async (req, res) => {
  try {
    const { name, label } = req.body;
    const designation = new Designation({
      name,
      label,
    });
    await designation.save();
    res
      .status(201)
      .json({ message: "Designation created successfully", designation });
  } catch (error) {
    console.error("Error creating designation:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getDesignationById = asyncHandler(async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }
    res.status(200).json(designation);
  } catch (error) {
    console.error("Error getting designation:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const deleteDesignation = asyncHandler(async (req, res) => {
  try {
    const deletedDesignation = await Designation.findByIdAndDelete(req.params.id);
    if (!deletedDesignation) {
      return res.status(404).json({ message: "Designation not found" });
    }
    res
      .status(200)
      .json({
        message: "Designation deleted successfully",
        designation: deletedDesignation,
      });
  } catch (error) {
    console.error("Error deleting designation:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const updateDesignation = asyncHandler(async (req, res) => {
  try {
    const { name, label } = req.body;

    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res.status(404).send("Designation not found");
    }

    // Update the designation fields if they are provided in the request body
    if (name) {
      designation.name = name;
    }
    if (label) {
      designation.label = label;
    }

    // Save the updated designation
    const updatedDesignation = await designation.save();
    res.status(200).json(updatedDesignation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating designation");
  }
});

export {
  getDesignations,
  createDesignation,
  getDesignationById,
  deleteDesignation,
  updateDesignation
};
