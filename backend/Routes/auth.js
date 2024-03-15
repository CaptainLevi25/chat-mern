import express from "express";
import { getallusers, getbyname, getsingleuser, login, logout, register } from "../Controllers/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/getbyname",getbyname);
router.get("/getallusers",getallusers);
router.get("/getsingleuser/:id",getsingleuser);
router.post("/logout",logout);


export default router;

