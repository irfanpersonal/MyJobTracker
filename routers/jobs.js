const express = require('express');
const router = express.Router();

const {showStats, getAllJobs, createJob, getSingleJob, updateSingleJob, deleteSingleJob} = require('../controllers/jobs.js');

router.route('/').get(getAllJobs).post(createJob);
router.route('/stats').get(showStats);
router.route('/:id').get(getSingleJob).patch(updateSingleJob).delete(deleteSingleJob);

module.exports = router;