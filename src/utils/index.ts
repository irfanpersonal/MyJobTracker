import jwt from 'jsonwebtoken';
import {IUser} from '../models/User';
import {Response} from 'express';

export interface ITokenPayload {
    userID: string,
    name: string,
    email: string
}

const createToken = (user: IUser): string => {  
    const payload: ITokenPayload = {
        userID: user._id,
        name: user.name,
        email: user.email
    }
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {expiresIn: process.env.JWT_LIFETIME as string}
    );
}

const createCookieWithToken = (res: Response, token: string): void => {
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    });
}

const verifyToken = (token: string): ITokenPayload => {
    return (jwt.verify(token, process.env.JWT_SECRET as string) as ITokenPayload);
}

export {
    createToken,
    createCookieWithToken,
    verifyToken
};