import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true })

const UsersModel = mongoose.model("users", usersSchema)
export default UsersModel