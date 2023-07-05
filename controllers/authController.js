import userModel from "../models/userModel";

export const registerController = async (req, res) => {
    try {
        const [name, email, password, phone, address] = req.body;
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

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in message",
            error
        })
    }
}

