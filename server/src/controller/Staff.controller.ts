import { NextFunction } from "express";
import StaffsService from "../services/Staff.service";

class StaffController {
    constructor() {}

    async getStaffs (req:any, res:any) {
        const staffs = await StaffsService.getAllStaffs();
        res.json(staffs);
    }

    async createStaffs (req:any, res:any) {
        const newStaff = await StaffsService.createStaff(req.body);
        res.json(newStaff);
    }

    async getStaff (req:any, res:any) {
        const id = req.params.id;
        const staff = await StaffsService.getStaff(id);
        res.json(staff);
    }

    async putStaff(req:any, res:any) {
        const id = req.params.id;
        const obj = req.body;
        const staff = await StaffsService.putStaff(id, obj);
        res.json(staff);
    }

    async deleteStaff (req:any, res:any) {
        const id = req.params.id;
        const staff = await  StaffsService.deleteStaff(id);
        res.json(staff);
    }

    async getStaffForLogin (req:any, res:any) {
        const username = req.body.username;
        const password = req.body.password;
        const result = await  StaffsService.getStaffforLogin(username, password);
        if(result.logged){
            req.session.user = {username: result.user?.username, role: result.role, email: result.user?.email, logged: true};
            console.log("Staff");
            console.log(req.session);
            res.json(req.session);
        } else {
            req.session.user = {logged:false};
            res.json(req.session);
        }
    }

    async getStaffByUsername (req:any, res:any, next:NextFunction) {
        const username = req.params.username;
        const user = await StaffsService.getStaffByUsername(username);
        if(!user)
        res.json({user:false});
        else {
            console.log(user);
            res.json(user);
        }
    }
}

export default new StaffController;