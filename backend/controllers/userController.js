const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const validateInput = (username, email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    
    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }
    if (!usernameRegex.test(username)) {
        return "Username must be 3-20 characters and contain only letters, numbers, and underscores";
    }
    if (password.length < 8) {
        return "Password must be at least 8 characters";
    }
    return null;
};

async function signup(req, res) {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const validationError = validateInput(username, email, password);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }
    
    try {
        const normalizedEmail = email.toLowerCase();
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken!" });
        }

        const existingEmail = await User.findOne({ email: normalizedEmail });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email: normalizedEmail,
            password: hashedPassword,
            repositories: [],
            followedUsers: [],
            starRepos: [],
        });

        const result = await newUser.save();
        const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        
        res.json({ token, userId: result._id, username: result.username });
    } catch (err) {
        console.error("Error during signup:", err.message);
        res.status(500).json({ message: "Server error during signup" });
    }
};

async function login(req, res) {
    const { email, password } = req.body; // 'email' field in request can be email or username
    
    if (!email || !password) {
        return res.status(400).json({ message: "Email/Username and password are required" });
    }
    
    try {
        // Find user by either email or username
        const user = await User.findOne({ 
            $or: [
                { email: email.toLowerCase() }, 
                { username: email } 
            ] 
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or username" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, userId: user._id, username: user.username });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Server error during login" });
    }
};

async function getAllUsers(req, res) {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (err) {
        console.error("Error during fetching:", err.message);
        res.status(500).send("Server error!");
    }
};

async function getUserProfile(req, res) {
    const currentID = req.query.userId || req.params.id;
    try {
        const user = await User.findById(currentID).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.send(user);
    } catch (err) {
        console.error("Error during fetching:", err.message);
        res.status(500).send("Server error!");
    }
};

async function updateUserProfile(req, res) {
    const currentID = req.query.userId || req.params.id;
    const { email, password, username } = req.body;

    try {
        let updateFields = { email, username };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(
            currentID,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.send(user);
    } catch (err) {
        console.error("Error during update:", err.message);
        res.status(500).send("Server error!");
    }
};

async function deleteUserProfile(req, res) {
    const currentID = req.query.userId || req.params.id;

    try {
        const user = await User.findByIdAndDelete(currentID);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.json({ message: "User profile Deleted!" });
    } catch (err) {
        console.error("Error during deletion:", err.message);
        res.status(500).send("Server error!");
    }
};

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
};