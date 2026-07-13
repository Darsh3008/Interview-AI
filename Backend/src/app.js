
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173",
    "https://interview-ai-one-sigma.vercel.app",
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is running successfully 🚀")
})
const authRouter = require("./routes/auth.routes.js")
const interviewRouter = require("./routes/interview.routes.js")
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)
module.exports = app