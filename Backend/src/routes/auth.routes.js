const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middleware/auth.middleware.js")

authRouter.post("/register",authController.registerUserController)
authRouter.post("/login",authController.loginUserController)
authRouter.get("/logout",authController.logoutUserController)
authRouter.get("/get-me" ,authMiddleware.authUser , authController.getMeController)

module.exports = authRouter