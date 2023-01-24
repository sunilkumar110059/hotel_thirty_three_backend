import HotelsModel from '../Models/HotelsModel.js';
import RoomsModel from '../Models/RoomsModel.js';
import { createError } from '../Utils/Error.js';

// ==== CREATE ROOM AND ROOM'S ID PUSH IN HOTEL ID
const createRoom = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelid;
        const newRoom = new RoomsModel(req.body)

        let hotelIdValue = await HotelsModel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } })
        if (hotelIdValue === null) {
            return next(createError(403, "Hotel Not Found"))
        }
        await newRoom.save()
        res.status(200).json(newRoom)
    } catch (err) {
        next(err)
    }
}


// ==== UPDATE ROOM
const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await RoomsModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedRoom)
    } catch (err) { next(err) }
}

// ==== DELETE ROOM AND DELETE ROOM ID FROM HOTEL ID
const deleteRoom = async (req, res, next) => {
    try {
        const { id, hotelid } = req.params;
        let hotelIdValue = await HotelsModel.findByIdAndUpdate(hotelid, { $pull: { rooms: id } })
        if (hotelIdValue === null) {
            return next(createError(404, "Delete Hotel ID Not Found"))
        }
        await RoomsModel.findByIdAndDelete(id)
        res.status(200).json({ msg: "Room has been deleted" })
    } catch (err) { next(err) }

}

// ==== GET ONE ROOM BY ID
const getRoom = async (req, res, next) => {
    try {
        const findSingleRoom = await RoomsModel.findById(req.params.id)
        res.status(200).json(findSingleRoom)
    } catch (err) { next(err) }
}

// ==== GET All ROOM 
const getAllRoom = async (req, res, next) => {
    try {
        const findAllRoom = await RoomsModel.find()
        res.status(200).json(findAllRoom)
    } catch (err) { next(err) }
}


export { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom }

