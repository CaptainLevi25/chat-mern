import  express  from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/auth.js"
import messageRoute from "./Routes/messages.js"
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
const connect =  async() =>{
    try {
        await mongoose.connect("mongodb+srv://pratyush2582002:A5NBG7Y2kYl5Zkgj@cluster0.zufjekx.mongodb.net/chats");
        console.log("mogoose connected")
    } catch (error) {
        console.log("mongo not connected")
    }
}
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/user/",authRoute);
app.use("/api/messages/",messageRoute);




app.listen(8000,()=>{
    connect();
    console.log("server started");
})

