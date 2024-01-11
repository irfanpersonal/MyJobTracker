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
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
// We set the mongoose.Schema type to "IUser", so that if we accidentally set the
// type of "password" to Number we get an error. That is the benefit of explicity 
// setting the type of mongoose.Schema to the interface "IUser". I get assistance.
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide User Name'],
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'Must Provide User Email'],
        validate: {
            validator: (value) => {
                return validator_1.default.isEmail(value);
            },
            message: 'Invalid Email Address'
        }
    },
    password: {
        type: String,
        required: [true, 'Must Provide User Password']
    }
}, { timestamps: true });
userSchema.index({ name: 1, email: 1 }, { unique: true });
userSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return;
        }
        const randomBytes = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, randomBytes);
    });
});
userSchema.post('deleteOne', { document: true, query: false }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const jobs = yield this.model('Job').find({ user: this._id });
        function deleteResumes(jobs) {
            return __awaiter(this, void 0, void 0, function* () {
                for (const job of jobs) {
                    yield node_fs_1.default.unlink(node_path_1.default.join(__dirname, '../files', job.resume), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        }
        deleteResumes(jobs);
        yield this.model('Job').deleteMany({ user: this._id });
    });
});
userSchema.methods.comparePassword = function (guess) {
    return __awaiter(this, void 0, void 0, function* () {
        const isCorrect = yield bcryptjs_1.default.compare(guess, this.password);
        return isCorrect;
    });
};
exports.default = mongoose_1.default.model('User', userSchema);
