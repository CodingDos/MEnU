import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { UpdateModeEnum } from "chart.js";

dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}

export const registerUser = async (req, res) => {
  console.log(req.body)
  try {
    const { username, email, password, firstName, lastName, description, img} = req.body
    // console.log(password.length);
    const existingUser = await User.findOne({ username })
    if(existingUser) {
      return res.status(400).json({ error: "Username already exist"})
    } 
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be between 6 and 15 characters." });
    }
    const password_digest = await bcrypt.hash( password, Number(process.env.SALT_ROUNDS) ) 

    const newUser = new User({
      username,
      email,
      password_digest,
      firstName,
      lastName,
      description,
      img
    })

    await newUser.save()

    const payload = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      description: newUser.description,
      img: newUser.img
    }

    const token = jwt.sign(payload, process.env.TOKEN_KEY);
    res.status(201).json({ token })
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const newUser = await User.findOne( {username: username }).select("username email password_digest")

    if(!newUser) {
      return res.status(401).json({ message: "Invalid username or password" })
    }
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }

    if(await bcrypt.compare( password, newUser.password_digest)) {
      const payload = {     
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      description: newUser.description,
      img: newUser.img
      }
      const token = jwt.sign(payload, process.env.TOKEN_KEY)

      res.status(201).json({ token })

    } else {
      res.status(401).send("Invalid Credentials");
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_KEY);
    if (payload) {
      res.json(payload);
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).send("Not Authorized");
  }
};

export const editUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if(!token){
      return res.status(401).json({error: "Authorization token not provided"})
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    const userId = decoded.id

    //will need to compare userId from token with "user" in the frontend.

    const { id } = req.params
    const user = await User.findByIdAndUpdate( id, req.body, {new: true})
    const updateToken = jwt.sign({
      username: user.username,
      email: user.email,
      description: user.description,
      img: user.img
    }, process.env.TOKEN_KEY)
    res.status(200).json({user: user, token: updateToken})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}


