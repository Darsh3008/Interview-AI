const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userModel = require("../models/user.model.js")
const tokenBlacklistModel = require("../models/blacklist.model.js")

function isAdminEmail(email) {
    const raw = process.env.ADMIN_EMAILS || ""
    const list = raw
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    return list.includes(String(email || "").trim().toLowerCase())
}

async function registerUserController(req, res) {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username , email and password"
        })
    }
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists"
        })
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hash,
        role: isAdminEmail(email) ? "admin" : "user"
    })
    const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("✅ Cookie sent:", token);

    return res.status(200).json({
        message: "Login successfully",
        token, // <-- temporary for debugging
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}
async function loginUserController(req, res) {
    const { email, password } = req.body;

    console.log("Login Request:", req.body);

    const user = await userModel.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
        return res.status(400).json({
            message: "User not found",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isPasswordValid);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    console.log("Login Successful");

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    console.log("Generated Token:", token);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        message: "Login successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
}
async function logoutUserController(req, res) {
    const token = req.cookies.token
    if (token) {
        await tokenBlacklistModel.create({ token })
    }
    res.clearCookie("token")

    return res.status(200).json({
        message: "User logged out successfully"
    })
}
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json(
        {
            message: "User detail fetch successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        },
    )
}



module.exports = { registerUserController, loginUserController, logoutUserController, getMeController }