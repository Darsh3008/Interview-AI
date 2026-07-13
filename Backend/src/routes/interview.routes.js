const express = require("express")
const authMiddleware = require("../middleware/auth.middleware.js")
const interviewController = require("../controllers/interview.controller.js")
const upload = require("../middleware/file.middleware.js")

const interviewRouter = express.Router()



interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)


module.exports = interviewRouter