require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

// Connect to MongoDB
connectToDB();

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});