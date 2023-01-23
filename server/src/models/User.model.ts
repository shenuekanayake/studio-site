import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;

const User = new Schema({
    username: String,
    name: String,
    contact: String,
    email: String,
    password: String,
    date: Date,
    accepted: Boolean
});

const UserModel = mongoose.model("User", User);

export default UserModel;
