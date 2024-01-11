"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const job_1 = require("../controllers/job");
router.route('/').get(job_1.getAllJobs).post(job_1.createJob);
router.route('/:id').get(job_1.getSingleJob).patch(job_1.updateSingleJob).delete(job_1.deleteSingleJob);
exports.default = router;
