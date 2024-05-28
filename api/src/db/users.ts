import mongoose from 'mongoose';
import { TaskModel } from './tasks';

import Task from './tasks.js'; 

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    dob: {type: Date},
    email: { type: String},
    phone_no: { type: String},
    authentication: {
        password: { type: String, required: true, select: false},
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    tasks: {type: [Task.schema], default: []}
});

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserByNameAndSurname = (name: string, surname: string) => UserModel.findOne({name, surname})
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)

