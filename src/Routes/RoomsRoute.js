import express from 'express';
const roomsRoute = express.Router();
import { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom } from '../Controller/RoomsController.js';
import { verifyAdmin, verifyUser } from '../Utils/VerifyToken.js';


roomsRoute.post('/:hotelid', verifyAdmin, createRoom)

roomsRoute.put('/:id', verifyAdmin, updateRoom);

roomsRoute.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

roomsRoute.get('/:id', getRoom);

roomsRoute.get('/', getAllRoom)

export default roomsRoute