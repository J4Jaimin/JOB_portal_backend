import mongoose, { mongo } from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta);
    } catch (error) {
        console.log(`MongoDB Error: ${error}..`.bgRed.white);
    }
}

export default connectDB;