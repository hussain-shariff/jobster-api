const express = require('express')
const router = express.Router()
const {
    getAllJobs,
    getJob,
    updateJob,
    deleteJob,
    createJob
} = require('../controllers/jobs')

router.get('/', getAllJobs)
router.get('/:id', getJob)
router.patch('/:id', updateJob)
router.delete('/:id', deleteJob)
router.post('/', createJob)

module.exports = router