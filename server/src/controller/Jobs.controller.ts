import JobsService from "../services/Jobs.service";

class JobController {
    constructor() {}

    async getJobs (req:any, res:any) {
        const staffs = await JobsService.getAllJobs();
        res.json(staffs);
    }

    async createJobs (req:any, res:any) {
        const newJob = await JobsService.createJob(req.body);
        res.json(newJob);
    }

    async getJob (req:any, res:any) {
        const id = req.params.id;
        const staff = await JobsService.getJob(id);
        res.json(staff);
    }

    async putJob(req:any, res:any) {
        const id = req.params.id;
        const obj = req.body;
        const staff = await JobsService.putJob(id, obj);
        res.json(staff);
    }

    async deleteJob (req:any, res:any) {
        const id = req.params.id;
        const staff = await  JobsService.deleteJob(id);
        res.json(staff);
    }
}

export default new JobController;