const {StatusCodes} = require('http-status-codes');
const User = require('../models/User.js');
const {UnauthorizedError, BadRequestError} = require('../errors');

const register = async(req, res) => {
    const user = await User.create(req.body);
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({user: {
        name: user.name,
        email: user.email,
        token
    }});
}

const login = async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({email});
    if (!user) {
        throw new UnauthorizedError('No User Exists with the Email Provided!');
    }
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
        throw new UnauthorizedError('Incorrect Password');
    }
    const token = user.createJWT();
    return res.status(StatusCodes.OK).json({user: {
        name: user.name,
        email: user.email,
        token
    }});
}

const updateUser = async(req, res) => {
    const {name, email} = req.body;
    if (!name || !email) {
        throw new BadRequestError('Please provide both name and email');
    }
    const user = await User.findOne({_id: req.user.userID});
    user.name = name;
    user.email = email;
    await user.save();
    const token = user.createJWT();
    return res.status(StatusCodes.OK).json({user: {
        name: user.name,
        email: user.email,
        token
    }});
}

module.exports = {
    register,
    login,
    updateUser
};