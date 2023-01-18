import Job from '../models/Job.model';

class JobService {
    constructor() {}

    async getAllJobs() {
        const iobs = await Job.find();
        return iobs;
    }

    async createJob(iob: any) {
        const newJob = new Job(iob);
        const createdJob = await newJob.save();
        return createdJob;
    }

    async getJob(id: any) {
        const iob = await Job.findById(id);
        return iob;
    }

    async putJob(id: any, obj: any) {
        const iob = await Job.findByIdAndUpdate(id, obj);
        return iob;
    }

    async deleteJob(id: any) {
        const delJob = await Job.findByIdAndDelete(id);
        return delJob;
    }

}

export default new JobService;