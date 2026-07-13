const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
    console.log("===== AUTH DEBUG =====");
    console.log("Cookie Header:", req.headers.cookie);
    console.log("Cookies:", req.cookies);

    const token = req.cookies.token;

    console.log("Token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication token not found",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        req.user = decoded;

        next();
    } catch (err) {
        console.log("JWT Verify Error:", err.message);

        return res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = { authUser };