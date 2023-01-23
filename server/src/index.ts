// import {config} from 'dotenv';
// config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import http from 'http';
import { Server } from 'socket.io';
import UserController from './controller/User.controller';
import StaffController from './controller/Staff.controller';
import JobsController from './controller/Jobs.controller';
import WorksController from './controller/Works.controller';
import SessionController from './controller/Sessions.controller';
const PORT = 5000;

const app = express();

app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

// Socket IO Configs
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
})



// Session Config
app.use(SessionController);

// File Uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, '../studio-client/src/assets/gallery'); //../studio-client/public/upload
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    }
  });
  
  const fileFilter = (req:any, file:any, callback:any) => {
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
      callback(null, true);
    } else {
      callback(null, false);
    }
  };
  
  const upload = multer({
    storage: storage, 
    limits: { 
      fileSize: 4 * 1024 * 1024
    },
    fileFilter: fileFilter
  });

app.route('/users')
    .get(UserController.getUsers)
    .post(UserController.createUsers);

app.route('/users/:id')
    .get(UserController.getUser)
    .put(UserController.putUser)
    .delete(UserController.deleteUser);

app.route('/staff')
    .get(StaffController.getStaffs)
    .post(StaffController.createStaffs);

app.route('/staff/:id')
    .get(StaffController.getStaff)
    .put(StaffController.putStaff)
    .delete(StaffController.deleteStaff);

app.route('/users/login')
    .post(UserController.getUserForLogin, StaffController.getStaffForLogin);
    // .post(UserController.getUserForLogin, StaffController.getStaffForLogin);

app.route('/users/byUsername/:username').get(UserController.getUserByUsername);
app.route('/staff/byUsername/:username').get(StaffController.getStaffByUsername);

app.route('/jobs')
    .get(JobsController.getJobs)
    .post(JobsController.createJobs);

app.route('/jobs/:id')
    .get(JobsController.getJob)
    .put(JobsController.putJob)
    .delete(JobsController.deleteJob); 

app.route('/works')
    .get(WorksController.getWorks)
    .post(upload.single('testImage'), WorksController.createWorks);

app.route('/works/:id')
    .get(WorksController.getWork)
    .put(WorksController.putWork)
    .delete(WorksController.deleteWork); 

app.get("/", (req, res) => {
    res.send("This is App");
})

mongoose.connect('mongodb+srv://hackishmax321:111222333@cluster001.4ziapbx.mongodb.net/?retryWrites=true&w=majority', {}).then(() => {
    console.log("DB Connected!");

    io.on("connection", (socket)=>{
      console.log(socket.id);

      socket.on("join_room", (data) => {
        socket.join(data);

      })

      socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("received_message", data);
      })
    
      socket.on("disconnect", () => {
        console.log("User Disconnected!");
      })
    });

    server.listen(PORT);
}).catch((err) => {console.log(err)})



