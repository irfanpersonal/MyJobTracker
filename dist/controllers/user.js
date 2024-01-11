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
exports.deleteAccount = exports.updateUserPassword = exports.updateUser = exports.showCurrentUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../utils");
const User_1 = __importDefault(require("../models/User"));
const errors_1 = __importDefault(require("../errors"));
const bad_request_error_1 = __importDefault(require("../errors/bad-request-error"));
const showCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
});
exports.showCurrentUser = showCurrentUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield User_1.default.findOne({ _id: req.user.userID }));
    const { name, email } = req.body;
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    yield user.save();
    const token = (0, utils_1.createToken)(user);
    (0, utils_1.createCookieWithToken)(res, token);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: {
            userID: user._id,
            name: user.name,
            email: user.email
        } });
});
exports.updateUser = updateUser;
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield User_1.default.findOne({ _id: req.user.userID }));
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new errors_1.default.BadRequestError('Please provide old and new password!');
    }
    const isCorrect = yield user.comparePassword(oldPassword);
    if (!isCorrect) {
        throw new errors_1.default.BadRequestError('Invalid Old Password!');
    }
    user.password = newPassword;
    yield user.save();
    const token = (0, utils_1.createToken)(user);
    (0, utils_1.createCookieWithToken)(res, token);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: {
            userID: user._id,
            name: user.name,
            email: user.email
        } });
});
exports.updateUserPassword = updateUserPassword;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield User_1.default.findOne({ _id: req.user.userID }));
    const { password } = req.body;
    if (!password) {
        throw new errors_1.default.BadRequestError('Please provide password!');
    }
    const isCorrect = yield user.comparePassword(password);
    if (!isCorrect) {
        throw new bad_request_error_1.default('Incorrect Password');
    }
    yield user.deleteOne();
    res.clearCookie('token');
    return res.status(http_status_codes_1.StatusCodes.OK).send();
});
exports.deleteAccount = deleteAccount;
