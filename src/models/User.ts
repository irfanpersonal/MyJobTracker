import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import fs from 'node:fs';
import path from 'node:path';

// Properties and Instance Methods go in here. The reason we extend mongoose.Document
// is so that we get stuff like "_id" defined for us. Otherwise we would have to do 
// that ourselves and that would be inconvenient.
export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    comparePassword: (guess: string) => Promise<boolean> 
}

// We set the mongoose.Schema type to "IUser", so that if we accidentally set the
// type of "password" to Number we get an error. That is the benefit of explicity 
// setting the type of mongoose.Schema to the interface "IUser". I get assistance.
const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Must Provide User Name'],
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'Must Provide User Email'],
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value);
            },
            message: 'Invalid Email Address'
        }
    },
    password: {
        type: String,
        required: [true, 'Must Provide User Password']
    }
}, {timestamps: true});

userSchema.index({name: 1, email: 1}, {unique: true});

userSchema.pre('save', async function(this: IUser) {
    if (!this.isModified('password')) {
        return;
    }
    const randomBytes = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, randomBytes);
});

userSchema.post('deleteOne', {document: true, query: false}, async function() {
    const jobs = await this.model('Job').find({user: this._id});
    async function deleteResumes(jobs: any) {
        for (const job of jobs) {
            await fs.unlink(path.join(__dirname, '../files', job.resume), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
    deleteResumes(jobs);
    await this.model('Job').deleteMany({user: this._id});
});

userSchema.methods.comparePassword = async function(this: IUser, guess: string) {
    const isCorrect = await bcrypt.compare(guess, this.password);
    return isCorrect;
}

export default mongoose.model<IUser>('User', userSchema);