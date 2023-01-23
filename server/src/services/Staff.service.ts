import Staff from '../models/Staff.model';

class StaffService {
    constructor() {}

    async getAllStaffs() {
        const staffs = await Staff.find();
        return staffs;
    }

    async createStaff(staff: any) {
        const newStaff = new Staff(staff);
        const createdStaff = await newStaff.save();
        return createdStaff;
    }

    async getStaff(id: any) {
        const staff = await Staff.findById(id);
        return staff;
    }

    async putStaff(id: any, obj: any) {
        const staff = await Staff.findByIdAndUpdate(id, obj);
        return staff;
    }

    async deleteStaff(id: any) {
        const delStaff = await Staff.findByIdAndDelete(id);
        return delStaff;
    }

    async getStaffforLogin(username: String, password: String) {
        console.log(username+"||"+password);
        const user = await Staff.findOne({username});
        console.log(user);
        if(user?.password==password) {
            return {user:user, logged: true, role: "Staff"};
        } else {
            return {logged: false};
        }
    }

    async getStaffByUsername(username: String) {
        console.log("User", username);
        const user = await Staff.find({username});
        console.log(user);
        if(user) return user
        else return false;
    }

}

export default new StaffService;