import mongoose from "mongoose"

const jobSchema = new mongoose.Schema(
	{
		position: String,
		company: String,
		status: {
			type: String,
			enums: ["pending", "interview", "declined"],
			default: "pending",
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "auth",
			required: [true, "Please provide user"],
		},
		location: String,
		jobType: {
			type: String,
			enums: ["Internship", "Full-Time", "Remote"],
			required: [true, "Please provide job Type"],
		},
	},
	{ timestamps: true }
)

const jobsModel = mongoose.model("jobs", jobSchema)
export default jobsModel
