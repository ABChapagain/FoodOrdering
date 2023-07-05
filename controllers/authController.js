import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import Jwt from "jsonwebtoken";

// POST REGISTER
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        //validation
        if (!name) {
            return res.send({ error: "Name is required" })
        }
        if (!password) {
            return res.send({ error: "password is required" })
        }
        if (!phone) {
            return res.send({ error: "Phone is required" })
        }
        if (!address) {
            return res.send({ error: "Address is required" })
        }
        if (!email) {
            return res.send({ error: "Email is required" })
        }
        //Check user
        const existingUser = await userModel.findOne({ email });

        //existing users
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already register please login"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();
        res.status(201).send({
            success: true,
            message: "User Register successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in registration",

        })
    }
};

// POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //checking user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        //matching password to procced login
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(404).send({
                success: false,
                message: "Invalid password"
            })
        }
        // token 
        const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
};

