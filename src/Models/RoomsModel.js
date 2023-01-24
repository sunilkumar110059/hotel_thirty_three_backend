import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    desc: { type: String, required: true },
    roomNumbers: [{
        num: Number,
        unavailableDates: { type: [Date] }
    }],
}, { timestamps: true })

const RoomsModel = mongoose.model("rooms", roomsSchema)
export default RoomsModel