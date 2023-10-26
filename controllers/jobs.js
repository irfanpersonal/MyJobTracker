const {StatusCodes} = require('http-status-codes');
const Job = require('../models/Job.js');
const {NotFoundError} = require('../errors');

const showStats = async(req, res) => {
    let pending = 0, interview = 0, rejected = 0, accepted = 0;
    const jobs = await Job.find({createdBy: req.user.userID});
    jobs.map(job => {
        if (job.status === 'pending') {
            pending += 1;
        }
        else if (job.status === 'interview') {
            interview += 1;
        }
        else if (job.status === 'rejected') {
            rejected += 1;
        }
        else {
            accepted += 1;
        }
    });
    return res.status(StatusCodes.OK).json({pending, interview, rejected, accepted});
}

const getAllJobs = async(req, res) => {
    const {search, status, sort} = req.query;
    const queryObject = {};
    if (search) {
        queryObject.name = {$regex: search, $options: 'i'};
    }
    if (status && status !== 'all') {
        queryObject.status = status;
    }
    let result = Job.find(queryObject);
    if (sort === 'a-z') {
        result = result.sort('name');
    }
    if (sort === 'z-a') {
        result = result.sort('-name');
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const jobs = await result;
    const totalJobs = await Job.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalJobs / limit);
    return res.status(StatusCodes.OK).json({jobs, totalJobs, numberOfPages});
}

const createJob = async(req, res) => {
    req.body.createdBy = req.user.userID;
    const job = await Job.create(req.body);
    return res.status(StatusCodes.CREATED).json({job});
}

const getSingleJob = async(req, res) => {
    const {id} = req.params;
    const job = await Job.findOne({_id: id, createdBy: req.user.userID});
    if (!job) {
        throw new NotFoundError('No Job with the ID provided exists!');
    }
    return res.status(StatusCodes.OK).json({job});
}

const updateSingleJob = async(req, res) => {
    const {id} = req.params;
    const job = await Job.findOne({_id: id, createdBy: req.user.userID});
    if (!job) {
        throw new NotFoundError('No Job with the ID provided exists!');
    }
    const {name, company, status} = req.body;
    if (name) {
        job.name = name;
    }
    if (company) {
        job.company = company;
    }
    if (status) {
        job.status = status;
    }
    await job.save();
    return res.status(StatusCodes.OK).json({job});
}

const deleteSingleJob = async(req, res) => {
    const {id} = req.params;
    const job = await Job.deleteOne({_id: id, createdBy: req.user.userID});
    if (!job.deletedCount) {
        throw new NotFoundError('No Job with the ID provided exists!');
    }
    return res.status(StatusCodes.OK).send();
}

module.exports = {
    showStats,
    getAllJobs,
    createJob,
    getSingleJob,
    updateSingleJob,
    deleteSingleJob
};