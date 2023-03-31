const jobsModel = require('../model/jobSchema')
const authModel = require('../model/authSchema')

const getAllJobs = async (req, res) =>{
    const jobs = await jobsModel.find({ createdBy : req.user.userID}).sort('createdAt')
    res.json({ count : jobs.length, jobs})
}
const getJob = async (req, res) =>{
    const {id} = req.params
    const {userID} = req.user
    const job = await jobsModel.findOne({_id : id, createdBy : userID})
    res.json(job)
}
const createJob = async (req, res) =>{
    req.body.createdBy = req.user.userID
    const job = await jobsModel.create(req.body)
    res.json(job)
}
const updateJob = async (req, res) =>{
    const { id } = req.params
    const {userID} = req.user
    const job = await jobsModel.findOneAndUpdate({ _id : id, createdBy : userID }, req.body, { new : true })
    res.json(job)
}
const updateUser = async (req, res) =>{
    const {userID} = req.user
    const user = await authModel.findOneAndUpdate({ _id : userID }, req.body, { new : true })
    res.json(user)
}

const getCurrentUser = async (req, res) =>{
    const {userID} = req.user
    const user = await authModel.findOne({ _id : userID })
    res.json(user)
}
const deleteJob = async (req, res) =>{
    const { id } = req.params
    const {userID} = req.user
    const jobs = await jobsModel.deleteOne({_id : id, createdBy : userID})
    res.json(jobs)
}

module.exports = {
    getAllJobs,
    getJob,
    updateJob,
    deleteJob,
    createJob,
    updateUser,
    getCurrentUser
}