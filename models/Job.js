const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide Job Name'],
        minLength: 4
    },
    company: {
        type: String,
        required: [true, 'Must Provide Job Company'],
        minLength: 4
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'interview', 'rejected', 'accepted'],
            message: '{VALUE} is not supported'
        },
        default: 'pending'
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'Must Provide Job CreatedBy'],
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Job', jobSchema);