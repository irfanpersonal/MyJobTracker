import {StatusCodes} from 'http-status-codes';
import {Request, Response} from 'express';
import {createToken, createCookieWithToken} from '../utils';
import User, {IUser} from '../models/User';
import CustomError from '../errors';

interface IRegisterRequest extends Request {
    body: IUser // Set the type for req.body
}

export interface IResponse {
    user: {
        userID: string,
        name: string,
        email: string
    }
}

const register = async(req: IRegisterRequest, res: Response<IResponse>) => {
    const user = await User.create(req.body);
    const token = createToken(user);
    createCookieWithToken(res, token);
    return res.status(StatusCodes.CREATED).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email
    }});
}

interface ILoginRequest extends Request {
    body: IUser
}

const login = async(req: ILoginRequest, res: Response<IResponse>) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password!');
    }
    const user = await User.findOne({email});
    if (!user) {
        throw new CustomError.NotFoundError('No User Found with the Email Provided!');
    }
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
        throw new CustomError.BadRequestError('Incorrect Password!');
    }
    const token = createToken(user);
    createCookieWithToken(res, token);
    return res.status(StatusCodes.CREATED).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email
    }});
}

const logout = async(req: Request, res: Response) => {
    res.clearCookie('token');
    return res.status(StatusCodes.OK).json({msg: 'Successfully Logged Out!'});
}

export {
    register,
    login,
    logout
};