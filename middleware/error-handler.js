const {StatusCodes} = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later!'
    };
    if (err.name === 'ValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = 'Please check all inputs';
    }
    if (err && err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = 'Someone already took that email, try another one!';
    }
    if (err.name === 'CastError') {
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.msg = 'No Job with the ID provided exists!';
    }
    return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandler;