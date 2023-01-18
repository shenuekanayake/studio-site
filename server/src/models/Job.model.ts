import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;

const Job = new Schema({
    title: String,
    user: String,
    fullName: String,
    contact: String,
    info: String,
    type: String,
    date: String,
    accepted: Boolean
});

const JobModel = mongoose.model("Job", Job);

export default JobModel;
