const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {db} = require("../utils/lowdb");
const {generateToken, generateRefreshToken} = require("../utils/generateToken");
const {hashPassword, comparePassword} = require("../utils/hashPassword");
const validatePassword = require("../utils/validatePassword");

// register
exports.register = async(req, res) => {
    try {
        const { username, email, password, role} = req.body;
        if (!validatePassword(password)) {
            return res.status(400).json({message: "password must be at least 8 characters long, must include 1 number and 1 special character"});
        }
        if (!username || !password) {
            return res.status(400).json({ message: "enter credentials"});
        }
        const existing_user = await User.findOne({email});
        if (existing_user) {
            return res.status(400).json({message: "user already exists"});
        }
        const hashed_password = await hashPassword(password);
        const user = new User({username, email, password: hashed_password, role});
        await user.save();
        res.status(201).json({message: "user created successfully"});
    } catch(error) {
        console.error("failed to register user: ", error);
        res.status(500).json({error: "failed to register user"});
    }
};

// login
exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({message: "invalid email or password"});
        }
        const is_matching = await comparePassword(password, user.password);
        if (!is_matching) {
            return res.status(401).json({message: "invalid email or password"});
        }
        const access_token = generateToken(user._id, user.role);
        const refresh_token = generateRefreshToken(user._id);
        db.data.refresh_tokens.push(refresh_token);
        await db.write();

        res.json({ access_token, refresh_token });
    } catch(error) {
        console.error("eror logging in: ", error);
        res.status(500).json({ error: "error logging in"});
    }
};

exports.refresh = (req, res) => {
    const {token} = req.body;
    if (!token || !db.data.refresh_tokens.includes(token)) {
        return res.status(403);
    }
    jwt.verify(token, process.env.SECRET_REFRESH_KEY, (err, user) => {
        if (err) {
            return res.status(403);
        }
        const access_token = generateToken(user.id, user.role);
        res.json({ access_token });
    });
};
