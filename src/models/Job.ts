import mongoose from 'mongoose';
import validator from 'validator';

interface IJob {
    name: string,
    company: string,
    status: 'pending' | 'interview' | 'accepted' | 'rejected',
    resume: string,
    location: string,
    salary: number,
    email: string,
    user: mongoose.Schema.Types.ObjectId
}

const jobSchema = new mongoose.Schema<IJob>({
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
            validator: (value: string) => {
                return validator.isEmail(value);
            },
            message: 'Invalid Email Address'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Must Provide Job User'],
        ref: 'User'
    }
}, {timestamps: true});

export default mongoose.model<IJob>('Job', jobSchema);