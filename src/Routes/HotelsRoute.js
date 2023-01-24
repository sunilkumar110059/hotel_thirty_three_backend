import express from 'express';
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from '../Controller/HotelsController.js';
import { verifyAdmin } from '../Utils/VerifyToken.js';
const hotelsRoute = express.Router();


// const createHotel = async (req, res, next) => {
//     const newHotel = new HotelsModel(req.body)
//     try {
//         const savedHotel = await newHotel.save();
//         res.status(200).json(savedHotel)
//     } catch (err) { next(err) }
// }


hotelsRoute.post('/', verifyAdmin, createHotel);

hotelsRoute.put('/:id', verifyAdmin, updateHotel);

hotelsRoute.delete('/:id', verifyAdmin, deleteHotel);

hotelsRoute.get('/:id', getHotel);

hotelsRoute.get('/', getAllHotel)

export default hotelsRoute