const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check whether all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email and password"
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Convert email to lowercase
        const normalizedEmail = email.toLowerCase().trim();

        // Check whether user already exists
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        // Create user
        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        // Send response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check whether all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        // Convert email to lowercase
        const normalizedEmail = email.toLowerCase().trim();

        // Find user
        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Send response
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};