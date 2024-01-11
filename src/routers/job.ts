import express from 'express';
const router: express.Router = express.Router();

import {getAllJobs, createJob, getSingleJob, updateSingleJob, deleteSingleJob} from '../controllers/job';

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getSingleJob).patch(updateSingleJob).delete(deleteSingleJob);

export default router;