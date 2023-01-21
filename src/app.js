import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './DB/Connect.js';
import authRoute from './Routes/AuthRoute.js';
import hotelsRoute from './Routes/hotelsRoute.js';
import roomsRoute from './Routes/roomsRoute.js';
import usersRoute from './Routes/usersRoute.js';


const app = express();
app.use(express.json())
app.use(cors());

app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || " Something Went Wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});


app.get('/', (req, res) => {
    res.send("Hello How are You!")
})






const PORTS = process.env.HOST || process.env.PORT
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(PORTS, () => {
            console.log(`connection is live at port ${PORTS}`)
        })
    } catch (err) {
        console.log(err, 'Connection Not Nonnect')
    }
}
startServer()
