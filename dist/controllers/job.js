"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleJob = exports.updateSingleJob = exports.getSingleJob = exports.createJob = exports.getAllJobs = void 0;
const http_status_codes_1 = require("http-status-codes");
const Job_1 = __importDefault(require("../models/Job"));
const errors_1 = __importDefault(require("../errors"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, status, sort } = req.query;
    const queryObject = {
        user: req.user.userID
    };
    if (search) {
        queryObject.name = { $regex: search, $options: 'i' };
    }
    if (status) {
        queryObject.status = status;
    }
    let result = Job_1.default.find(queryObject);
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
    const jobs = yield result;
    const totalJobs = yield Job_1.default.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalJobs / limit);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ jobs, totalJobs, numberOfPages });
});
exports.getAllJobs = getAllJobs;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.files) === null || _a === void 0 ? void 0 : _a.resume)) {
        throw new errors_1.default.BadRequestError('Please provide a resume!');
    }
    const resume = req.files.resume;
    // Logic to Check File Type
    if (resume.mimetype !== 'application/pdf') {
        throw new errors_1.default.BadRequestError('File Type Must be PDF!');
    }
    const uniqueIdentifier = new Date().getTime() + '_' + req.user.userID + '_' + resume.name;
    const destination = node_path_1.default.resolve(__dirname, '../files', uniqueIdentifier);
    req.body.resume = `/${uniqueIdentifier}`;
    req.body.user = req.user.userID;
    const job = yield Job_1.default.create(req.body);
    yield resume.mv(destination);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ job });
});
exports.createJob = createJob;
const getSingleJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const job = yield Job_1.default.findOne({ _id: id, user: req.user.userID });
    if (!job) {
        throw new errors_1.default.NotFoundError('No Job Found with the ID Provided!');
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ job });
});
exports.getSingleJob = getSingleJob;
const updateSingleJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const job = yield Job_1.default.findOne({ _id: id, user: req.user.userID });
    if (!job) {
        throw new errors_1.default.NotFoundError('No Job Found with the ID Provided!');
    }
    const { name, company, status, location, email, salary } = req.body;
    if ((_b = req.files) === null || _b === void 0 ? void 0 : _b.resume) {
        if (job.resume) {
            yield node_fs_1.default.unlink(node_path_1.default.join(__dirname, '../files', job.resume), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        const resume = req.files.resume;
        const uniqueIdentifier = new Date().getTime() + '_' + req.user.userID + '_' + resume.name;
        const destination = node_path_1.default.resolve(__dirname, '../files', uniqueIdentifier);
        yield resume.mv(destination);
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
    yield job.save();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ job });
});
exports.updateSingleJob = updateSingleJob;
const deleteSingleJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const job = yield Job_1.default.findOne({ _id: id, user: req.user.userID });
    if (!job) {
        throw new errors_1.default.NotFoundError('No Job Found with the ID Provided!');
    }
    yield node_fs_1.default.unlink(node_path_1.default.join(__dirname, '../files', job.resume), (err) => {
        if (err) {
            console.log(err);
        }
    });
    yield job.deleteOne();
    return res.status(http_status_codes_1.StatusCodes.OK).send();
});
exports.deleteSingleJob = deleteSingleJob;
