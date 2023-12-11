import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password should be greater than six character."],
        select: true,
    },
    location: {
        type: String,
        default: "India",
    },
},
    { timestamps: true }
);

// middlewares
userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePasswords = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}

// JSON WebToken
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_Private_key, { expiresIn: "1d" });
}

export default mongoose.model("User", userSchema);