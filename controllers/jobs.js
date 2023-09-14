import jobsModel from "../model/jobSchema.js"
import authModel from "../model/authSchema.js"
import mongoose from "mongoose"
import moment from "moment"

export const getAllJobs = async (req, res) => {
	const jobs = await jobsModel
		.find({ createdBy: req.user.userID })
		.sort("createdAt")
	let monthlyApplications = await jobsModel.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userID) } },
		{
			$group: {
				_id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
				count: { $sum: 1 },
			},
		},
		{ $sort: { "_id.year": -1, "_id.month": -1 } },
		{ $limit: 6 },
	])
	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item
			const date = moment()
				.month(month - 1)
				.year(year)
				.format("MMM Y")
			return { date, count }
		})
		.reverse()
	res.json({ count: jobs.length, jobs, monthlyApplications })
}
export const getJob = async (req, res) => {
	const { id } = req.params
	const { userID } = req.user
	const job = await jobsModel.findOne({ _id: id, createdBy: userID })
	res.json(job)
}
export const createJob = async (req, res) => {
	req.body.createdBy = req.user.userID
	const job = await jobsModel.create(req.body)
	res.json(job)
}
export const updateJob = async (req, res) => {
	const { id } = req.params
	const { userID } = req.user
	const job = await jobsModel.findOneAndUpdate(
		{ _id: id, createdBy: userID },
		req.body,
		{ new: true }
	)
	res.json(job)
}
export const updateUser = async (req, res) => {
	const { userID } = req.user
	const user = await authModel.findOneAndUpdate({ _id: userID }, req.body, {
		new: true,
	})
	res.json(user)
}

export const getCurrentUser = async (req, res) => {
	const { userID } = req.user
	const user = await authModel.findOne({ _id: userID })
	res.json(user)
}
export const deleteJob = async (req, res) => {
	const { id } = req.params
	const { userID } = req.user
	const jobs = await jobsModel.deleteOne({ _id: id, createdBy: userID })
	res.json(jobs)
}

export const filterJobs = async (req, res) => {
	const { status, jobType, search, sort } = req.query
	const queryObject = {
		createdBy: req.user.userID,
	}
	if (status && status !== "all") {
		queryObject.status = status
	}
	if (jobType && jobType !== "all") {
		queryObject.jobType = jobType
	}
	if (search) {
		queryObject.position = { $regex: search, $options: "i" }
	}

	if (sort === "latest") {
		querySort = "-createdAt"
	}
	if (sort === "oldest") {
		querySort = "createdAt"
	}
	if (sort === "a-z") {
		querySort = "position"
	}
	if (sort === "z-a") {
		querySort = "-position"
	}
	const jobs = await jobsModel.find(queryObject).sort(querySort)
	res.json(jobs)
}
