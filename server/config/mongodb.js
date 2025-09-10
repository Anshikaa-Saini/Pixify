import mongoose from "mongoose";

const connectdb = async () => {
    mongoose.connection.on("connected", () => {
        console.log("Mongodb connected successfully");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/Pixify`)
}

export default connectdb;