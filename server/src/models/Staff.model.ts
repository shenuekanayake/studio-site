import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;

const Staff = new Schema({
    username: String,
    name: String,
    contact: String,
    email: String,
    position: String,
    password: String,
    date: Date,
    accepted: Boolean
});

const StaffModel = mongoose.model("Staff", Staff);

export default StaffModel;
