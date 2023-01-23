import Work from '../models/Work.model';

class WorkService {
    constructor() {}

    async getAllWorks() {
        const iobs = await Work.find();
        return iobs;
    }

    async createWork(iob: any) {
        const newWork = new Work(iob);
        const createdWork = await newWork.save();
        return createdWork;
    }

    async getWork(id: any) {
        const iob = await Work.findById(id);
        return iob;
    }

    async putWork(id: any, obj: any) {
        const iob = await Work.findByIdAndUpdate(id, obj);
        return iob;
    }

    async deleteWork(id: any) {
        const delWork = await Work.findByIdAndDelete(id);
        return delWork;
    }

}

export default new WorkService;