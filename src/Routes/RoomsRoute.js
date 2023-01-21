import express from 'express';
const roomsRoute = express.Router();

roomsRoute.get('/', (req, res) => {
    res.send("This is Rooms Route")
})



export default roomsRoute