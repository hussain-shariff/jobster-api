const express = require('express')
const router = express.Router()
const {
    getAllJobs,
    getJob,
    updateJob,
    deleteJob,
    createJob,
    updateUser,
    getCurrentUser,
    filterJobs
} = require('../controllers/jobs')

router.get('/', getAllJobs)
router.get('/filter', filterJobs)
router.get('/user', getCurrentUser)
router.get('/:id', getJob)
router.patch('/:id', updateJob)
router.patch('/', updateUser)
router.delete('/:id', deleteJob)
router.post('/', createJob)

module.exports = router