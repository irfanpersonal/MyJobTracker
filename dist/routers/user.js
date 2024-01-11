"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../controllers/user");
router.route('/showCurrentUser').get(user_1.showCurrentUser);
router.route('/updateUser').patch(user_1.updateUser);
router.route('/updateUserPasssword').patch(user_1.updateUserPassword);
router.route('/deleteAccount').delete(user_1.deleteAccount);
exports.default = router;
