import message from "../Models/message.js";

import jwt from "jsonwebtoken";

export const addmessage = async (req, res) => {
  const  toid  = req.params.id; 

  try {
    const token = req.cookies.accesstoken;

    if (!token) return res.status(500).send("token invalid");

    jwt.verify(token, "jwt", async (err, payload) => {
      if (err) return res.status.send("Token is not valid!");
      const {  content } = req.body;
      const from = payload.id.toString();

      const newMessage = new message({
        message: content,
        users: [from, toid],
        sender: from,
      });
      await newMessage.save();
      res.status(200).send("message created successfully");
    });
  } catch (e) {
    res.status(500).send("error from addmessage");
  }
};

export const getmessage = async (req, res) => {
  const  toid  = req.params.id; 


  try {
    const token = req.cookies.accesstoken;

    if (!token) return res.status(500).send("token invalid");
    jwt.verify(token, "jwt", async (err, payload) => {
    if (err) return res.status.send("Token is not valid!");
    const allmessages = await message.find(
     {$and : [{users: { $in: [toid] }} , {users : {$in : [payload.id]}}]}
    );
    if (allmessages.length > 0) { 
      res.status(200).send(allmessages);
    } else {
      res.status(404).send("Not found"); 
    }
  }) }catch (e) {
    console.error(e); 
    res.status(500).send("Internal Server Error");
  }
};
