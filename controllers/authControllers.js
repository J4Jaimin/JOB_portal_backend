import userModel from "../models/userModel.js"

// REGISTER || POST

export const registerUserController = async (req, res, next) => {
    const { name, email, password } = await req.body;

    if (!name) {
        return next("Name field is required.");
    }
    if (!email) {
        return next("Email field is required.");
    }
    if (!password) {
        return next("Password field is required and must be greater than 6 character.");
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return next("User already exist, please login.");
    }

    const user = await userModel.create({ name, email, password });

    //token 
    const token = user.createJWT();

    res.status(201).send({
        "success": true,
        "message": "You are registered successfully!",
        user: {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            location: user.location,
        },
        token,
    });
}

// LOGIN || POST

export const loginUserController = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next("Please enter all fields.");
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return next("Wrong username or password.");
    }

    const isMatch = await user.comparePasswords(password);

    if (!isMatch) {
        return next("Wrong username or password.");
    }

    user.password = undefined;
    const token = await user.createJWT();

    console.log("Successfully logged in !!");

    res.status(200).send({
        success: true,
        message: "Successfully Logged In!!",
        user,
        token,
    });
}