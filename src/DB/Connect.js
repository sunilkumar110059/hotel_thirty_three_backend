
import mongoose from 'mongoose';

const connectDB = async (MONGODB_URL) => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGODB_URL)
        console.log("MongoDB Connection is Fullfill")
    }
    catch (err) {
        console.log(err, "MongoDB Not Connected")
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected")
})
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected")
})


export default connectDB 
