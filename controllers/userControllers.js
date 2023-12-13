import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const getUserController = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ _id: req.user.userId }).select("+password");
        user.password = undefined;

        res.status(201).send({
            user,
        });

    } catch (error) {
        console.log(error);
        next("Authentication failed.");
    }
}

export const updateUserController = async (req, res, next) => {

    const { name, lastname, email, location } = req.body;

    console.log(req.body);

    if (!name || !lastname || !email || !location) {
        return next("Provide all details.");
    }

    try {
        const user = await userModel.findOne({ _id: req.user.userId }).select("+password");

        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.location = location;

        await user.save();

        user.password = undefined;

        res.status(201).send({
            user,
        });

    } catch (error) {
        console.log(error);
        return next("Authentication failed!");
    }

};