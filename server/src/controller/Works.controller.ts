import WorksService from "../services/Works.service";
import multer from 'multer';

// Uploads Config
// const storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req:any, file:any, cb:any) => {
//         cb(null, file.orginalname);
//     },
// });

// const upload = multer({
//     storage: storage
// }).single('testImage');

class WorkController {
    constructor() {}
    

    async getWorks (req:any, res:any) {
        const staffs = await WorksService.getAllWorks();
        res.json(staffs);
    }

    async createWorks (req:any, res:any) {
        // Upload Settings
        // console.log(req.file);
        // Image settings
        req.body.image = {name: req.file.originalname, contentType: req.file.mimetype, data:req.file.filename}
        const newWork = await WorksService.createWork(req.body);
        res.json(newWork);
    }

    async getWork (req:any, res:any) {
        const id = req.params.id;
        const staff = await WorksService.getWork(id);
        res.json(staff);
    }

    async putWork(req:any, res:any) {
        const id = req.params.id;
        const obj = req.body;
        const staff = await WorksService.putWork(id, obj);
        res.json(staff);
    }

    async deleteWork (req:any, res:any) {
        const id = req.params.id;
        const staff = await  WorksService.deleteWork(id);
        res.json(staff);
    }
}

export default new WorkController;