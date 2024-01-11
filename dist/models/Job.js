"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const jobSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide Job Name'],
        minLength: 3
    },
    company: {
        type: String,
        required: [true, 'Must Provide Job Company'],
        minLength: 3
    },
    status: {
        type: String,
        default: 'pending',
        enum: {
            values: ['pending', 'interview', 'accepted', 'rejected'],
            message: '{VALUE} is not supported'
        }
    },
    resume: {
        type: String,
        required: [true, 'Must Provide Job Resume']
    },
    location: {
        type: String,
        required: [true, 'Must Provide Job Location']
    },
    salary: {
        type: Number,
        required: [true, 'Must Provide Job Salary']
    },
    email: {
        type: String,
        required: [true, 'Must Provide Job Email'],
        validate: {
            validator: (value) => {
                return validator_1.default.isEmail(value);
            },
            message: 'Invalid Email Address'
        }
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'Must Provide Job User'],
        ref: 'User'
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Job', jobSchema);
