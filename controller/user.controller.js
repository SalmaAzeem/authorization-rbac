const User = require('../models/user.model');
const {hashPassword, comparePassword} = require("../utils/hashPassword");

// `GET /api/profile` → Returns authenticated user's profile info
exports.getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({message: "user not found"});
        }
        res.json(user);
    } catch (error) {
        console.error("user not found: ", error);
        res.status(500).json({error: error.message});
    }
};

// - `PUT /api/profile` → Update `email` and `password`
exports.updateProfile = async(req, res) => {
    try {
        const {email, current_password, new_password} = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({message: "user not found"});
        }
        // wants to update email only
        if (email) {
            const email_exists = await User.findOne({email});
            if (email_exists && email_exists._id.toString() !== req.user.id) {
                return res.status(400).json({ message: "email already exists"});
            }
            user.email = email;
        }
        // wants to update email and password
        if (current_password && new_password) {
            const is_matching = await comparePassword(current_password, user.password);
            if (!is_matching) {
                return res.status(400).json({message: "password is wrong"});
            }
            const hashed_password = hashPassword(new_password);
            user.password = hashed_password;
        }
        await user.save();
        res.json({message: "user updated successfully"});
    } catch (error) {
        console.error("failed to update user: ", error);
        res.status(500).json({error: "failed to update user"});
    }
};

// `PUT /api/users/:id/role` → Admin-only: Update a user's role
exports.updateRole = async(req, res) => {
    try {
        const {id} = req.params;
        const {role} = req.body;
        const user = await User.findById(id);
        const roles = ["admin", "user", "moderator"];
        if (!roles.includes(role)) {
            return res.status(400).json({message: "invalid role"});
        }
        if (!user) {
            return res.status(404).json({message: "no user found"});
        }
        user.role = role;
        await user.save();
        res.json({message: "user role updated successfully"});
    } catch(error) {
        console.error("failed to update user's role: ", error);
        res.status(500).json({error: "failed to update user's role"});
    }
};