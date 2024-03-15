import User from "../Models/user.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send("resgister successfully");
  } catch (error) {
    return res.status(500).send("error from controller register");
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(req.body.username);
    if (!user) {
      return res.status(500).send("user not found from login controller");
    }
    if (user.password !== req.body.password) {
      return res.status(500).send("passowrd not found login controller");
    }
    const token = jwt.sign({ id: user._id }, "jwt");

    res.cookie("accesstoken", token, { httpOnly: true }).status(200).send(user);
    console.log(token);
  } catch (e) {
    res.status(500).send("error in login");
  }
};

export const getallusers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).send(users);
    }
  } catch (e) {
    res.status(500).send("error from controller register");
  }
};

export const getbyname = async (req, res) => {
  try {
    const user = await User.find({
      username: { $regex: req.body.keyWord, $options: "i" },
    });
    if (user.length > 0) res.status(200).send(user);
    else res.status(200).send([]);
  } catch (e) {
    res.status(500).send("error from getbyname register");
  }
};

export const getsingleuser = async (req, res) => {
  const id = req.params.id;

  try {
    const token = req.cookies.accesstoken;

    if (!token) return res.status(500).send("token invalid");
    jwt.verify(token, "jwt", async (err, payload) => {
      if (err) return res.status.send("Token is not valid!");
      const single = await User.find({ _id: id });
      if (single.length > 0) {
        res.status(200).send(single);
      } else {
        res.status(404).send("Not found");
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

export const logout = async () => {};
