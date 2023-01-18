import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;

const Work = new Schema({
    title: String,
    user: String,
    info: String,
    type: String,
    image: {name: String, data: Buffer, contentType: String},
    date: Date,
    accepted: Boolean
});

const WorkModel = mongoose.model("Work", Work);

export default WorkModel;
