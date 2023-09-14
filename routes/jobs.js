import express from "express"
const jobsRoute = express.Router()
import {
	getAllJobs,
	getJob,
	updateJob,
	deleteJob,
	createJob,
	updateUser,
	getCurrentUser,
	filterJobs,
} from "../controllers/jobs.js"

jobsRoute.get("/", getAllJobs)
jobsRoute.get("/filter", filterJobs)
jobsRoute.get("/user", getCurrentUser)
jobsRoute.get("/:id", getJob)
jobsRoute.patch("/:id", updateJob)
jobsRoute.patch("/", updateUser)
jobsRoute.delete("/:id", deleteJob)
jobsRoute.post("/", createJob)

export default jobsRoute
