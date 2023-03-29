const express = require('express')
const router = express.Router()
const {
    getAllJobs,
    getJob,
    updateJob,
    deleteJob,
    createJob,
    updateUser
} = require('../controllers/jobs')

router.get('/', getAllJobs)
router.get('/:id', getJob)
router.patch('/:id', updateJob)
router.patch('/', updateUser)
router.delete('/:id', deleteJob)
router.post('/', createJob)

module.exports = router