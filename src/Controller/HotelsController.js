
import HotelsModel from '../Models/HotelsModel.js';

// ==== CREATE HOTEL
const createHotel = async (req, res, next) => {
    const newHotel = new HotelsModel(req.body)
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (err) { next(err) }
}

// ==== UPDATE HOTEL
const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await HotelsModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedHotel)
    } catch (err) { next(err) }
}

// ==== DELETE HOTEL
const deleteHotel = async (req, res, next) => {
    try {
        await HotelsModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Hotel has been deleted" })
    } catch (err) { next(err) }
}

// ==== GET ONE HOTEL BY ID
const getHotel = async (req, res, next) => {
    try {
        const findSingleHotel = await HotelsModel.findById(req.params.id)
        res.status(200).json(findSingleHotel)
    } catch (err) { next(err) }
}

// ==== GET All HOTELS 
const getAllHotel = async (req, res, next) => {
    try {
        const findAllHotels = await HotelsModel.find()
        res.status(200).json(findAllHotels)
    } catch (err) { next(err) }
}

export { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel }