import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";

// Get User Profile
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
        role: user.role, // Include the role here
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete User Account
export const deleteUserAccount = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
