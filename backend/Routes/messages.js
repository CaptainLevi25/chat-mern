import express from "express";
import {addmessage,  getmessage } from "../Controllers/message.js";

const router = express.Router();

router.post("/addmessage/:id",addmessage);
router.get("/getmessage/:id",getmessage);



export default router;