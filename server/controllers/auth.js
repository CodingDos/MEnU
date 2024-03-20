import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const registerUser = async (req, res) => {
  try {
    const { username, email, password, firstname, lastname, description} = req.body

    const existingUser = await User.findOne({ username })
    if(existingUser) {
      return res.status(400).json({ error: "Username already exist"})
    } 
    if (password.length < 6 || password.length > 15) {
      return res
        .status(400)
        .json({ error: "Password must be between 6 and 15 characters." });
    }
    const password_digest = await bcrypt.hash( password, Number(process.env.SALT_ROUNDS) ) 

    const newUser = new User({
      username,
      email,
      password_digest,
      firstname,
      lastname,
      description
    })

    await newUser.save()

    const payload = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      description: newUser.description
    }

    const token = jwt.sign(payload, process.env.TOKEN_KEY);
    res.status(400).json({ token })
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
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      description: newUser.description
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