import express from 'express';
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from '../Controller/HotelsController.js';
import { verifyAdmin } from '../Utils/VerifyToken.js';
const hotelsRoute = express.Router();



hotelsRoute.post('/', verifyAdmin, createHotel);

hotelsRoute.put('/:id', verifyAdmin, updateHotel);

hotelsRoute.delete('/:id', verifyAdmin, deleteHotel);

hotelsRoute.get('/:id', getHotel);

hotelsRoute.get('/', getAllHotel)

export default hotelsRoute