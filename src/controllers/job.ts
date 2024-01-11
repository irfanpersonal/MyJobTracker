import {StatusCodes} from 'http-status-codes';
import {Request, Response} from 'express';
import {ITokenPayload} from '../utils';
import {UploadedFile} from 'express-fileupload';
import Job from '../models/Job';
import CustomError from '../errors';
import path from 'node:path';
import fs from 'node:fs';

interface IGetAllJobsRequest extends Request {
    user?: ITokenPayload,
    query: {
        search: string,
        status: 'pending' | 'interview' | 'accepted' | 'rejected',
        sort: 'a-z' | 'z-a',
        limit: string,
        page: string
    }
}

interface IQueryObject {
    user: string,
    name: {$regex: string, $options: string},
    status: string
}

const getAllJobs = async(req: IGetAllJobsRequest, res: Response) => {
    const {search, status, sort} = req.query;
    const queryObject: Partial<IQueryObject> = {
        user: req.user!.userID
    };
    if (search) {
        queryObject.name = {$regex: search, $options: 'i'};
    }
    if (status) {
        queryObject.status = status;
    }
    let result = Job.find(queryObject);
    if (sort === 'a-z') {
        result = result.sort('name');
    }
    if (sort === 'z-a') {
        result = result.sort('-name');
    }
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const jobs = await result;
    const totalJobs = await Job.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalJobs / limit);
    return res.status(StatusCodes.OK).json({jobs, totalJobs, numberOfPages});
}

interface ICreateJobRequest extends Request {
    user?: ITokenPayload,
    body: {name: string, company: string, user: string, resume: string, location: string}
}

const createJob = async(req: ICreateJobRequest, res: Response) => {
    if (!req.files?.resume) {
        throw new CustomError.BadRequestError('Please provide a resume!');
    }
    const resume = req.files.resume as UploadedFile;
    // Logic to Check File Type
    if (resume.mimetype !== 'application/pdf') {
        throw new CustomError.BadRequestError('File Type Must be PDF!');
    }
    const uniqueIdentifier = new Date().getTime() + '_' + req.user!.userID + '_' + resume.name;
    const destination = path.resolve(__dirname, '../files', uniqueIdentifier);
    req.body.resume = `/${uniqueIdentifier}`;
    req.body.user = req.user!.userID;
    const job = await Job.create(req.body);
    await resume.mv(destination);
    return res.status(StatusCodes.CREATED).json({job});
}

interface IGetSingleJobRequest extends Request {
    user?: ITokenPayload,
    params: {id: string}
}

const getSingleJob = async(req: IGetSingleJobRequest, res: Response) => {
    const {id} = req.params;
    const job = await Job.findOne({_id: id, user: req.user!.userID});
    if (!job) {
        throw new CustomError.NotFoundError('No Job Found with the ID Provided!');
    }
    return res.status(StatusCodes.OK).json({job});
}

interface IUpdateSingleJobRequest extends Request {
    user?: ITokenPayload,
    params: {id: string},
    body: {name: string, company: string, status: 'pending' | 'interview' | 'accepted' | 'rejected', location: string, email: string, salary: number}
}

const updateSingleJob = async(req: IUpdateSingleJobRequest, res: Response) => {
    const {id} = req.params;
    const job = await Job.findOne({_id: id, user: req.user!.userID});
    if (!job) {
        throw new CustomError.NotFoundError('No Job Found with the ID Provided!');
    }
    const {name, company, status, location, email, salary} = req.body;
    if (req.files?.resume) {
        if (job.resume) {
            await fs.unlink(path.join(__dirname, '../files', job.resume), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        const resume = req.files.resume as UploadedFile;
        const uniqueIdentifier = new Date().getTime() + '_' + req.user!.userID + '_' + resume.name;
        const destination = path.resolve(__dirname, '../files', uniqueIdentifier);
        await resume.mv(destination);
        job.resume = `/${uniqueIdentifier}`;
    }
    if (name) {
        job.name = name;
    }
    if (company) {
        job.company = company;
    }
    if (status) {
        job.status = status;
    }
    if (location) {
        job.location = location;
    }
    if (email) {
        job.email = email;
    }
    if (salary) {
        job.salary = salary;
    }
    await job.save();
    return res.status(StatusCodes.OK).json({job});
}

interface IDeleteSingleJobRequest extends Request {
    user?: ITokenPayload,
    params: {id: string}
}

const deleteSingleJob = async(req: IDeleteSingleJobRequest, res: Response) => {
    const {id} = req.params;
    const job = await Job.findOne({_id: id, user: req.user!.userID});
    if (!job) {
        throw new CustomError.NotFoundError('No Job Found with the ID Provided!');
    }
    await fs.unlink(path.join(__dirname, '../files', job.resume), (err) => {
        if (err) {
            console.log(err);
        }
    });
    await job.deleteOne();
    return res.status(StatusCodes.OK).send();
}

export {
    getAllJobs,
    createJob,
    getSingleJob,
    updateSingleJob,
    deleteSingleJob
};