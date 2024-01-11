import {StatusCodes} from 'http-status-codes';
import {Request, Response} from 'express';
import {ITokenPayload} from '../utils';
import {createToken, createCookieWithToken} from '../utils';
import {IResponse} from './auth';
import User from '../models/User';
import CustomError from '../errors';
import BadRequestError from '../errors/bad-request-error';

interface IShowCurrentUser extends Request {
    user?: ITokenPayload
}

const showCurrentUser = async(req: IShowCurrentUser, res: Response) => {
    return res.status(StatusCodes.OK).json({user: req.user});
}

interface IUpdateUserRequest extends Request {
    user?: ITokenPayload,
    body: {name: string, email: string}
}

const updateUser = async(req: IUpdateUserRequest, res: Response<IResponse>) => {
    const user = (await User.findOne({_id: req.user!.userID}))!;
    const {name, email} = req.body;
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    await user.save();
    const token = createToken(user);
    createCookieWithToken(res, token);
    return res.status(StatusCodes.OK).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email
    }});
}

interface IUpdateUserPasswordRequest extends Request {
    user?: ITokenPayload,
    body: {oldPassword: string, newPassword: string}
}

const updateUserPassword = async(req: IUpdateUserPasswordRequest, res: Response<IResponse>) => {
    const user = (await User.findOne({_id: req.user!.userID}))!;
    const {oldPassword, newPassword} = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide old and new password!');
    }
    const isCorrect = await user.comparePassword(oldPassword);
    if (!isCorrect) {
        throw new CustomError.BadRequestError('Invalid Old Password!');
    }
    user.password = newPassword;
    await user.save();
    const token = createToken(user);
    createCookieWithToken(res, token);
    return res.status(StatusCodes.OK).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email
    }});
}

interface IDeleteAccountRequest extends Request {
    user?: ITokenPayload,
    body: {password: string}
}

const deleteAccount = async(req: IDeleteAccountRequest, res: Response) => {
    const user = (await User.findOne({_id: req.user!.userID}))!;
    const {password} = req.body;
    if (!password) {
        throw new CustomError.BadRequestError('Please provide password!');
    }
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
        throw new BadRequestError('Incorrect Password');
    }
    await user.deleteOne();
    res.clearCookie('token');
    return res.status(StatusCodes.OK).send();
}

export {
    showCurrentUser,
    updateUser,
    updateUserPassword,
    deleteAccount
};