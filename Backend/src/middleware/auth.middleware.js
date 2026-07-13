const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");
const authUser = async (req, res, next) => {
    console.log("===== AUTH DEBUG =====");
    console.log("Cookies:", req.cookies);

    const token = req.cookies.token;
    console.log("Token:", token);

    try {
        if (!token) {
            console.log("❌ No token received");
            return res.status(401).json({
                success: false,
                message: "Authentication token not found",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded:", decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT Error:", err.message);

        return res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};
module.exports = { authUser };