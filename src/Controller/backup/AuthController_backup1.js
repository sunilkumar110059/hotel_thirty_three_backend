
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UsersModel from "../../Models/UsersModel.js";
import { createError, createSuccess } from "../../Utils/Error.js";

const registerHandler = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new UsersModel({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        const user = await UsersModel.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }]
        })

        // check user exit in User Api
        if (user !== null) {
            user.username === newUser.username && next(createError(400, "This user name already exit"))
            user.email === newUser.email && next(createError(400, "This email already exit"))
            return true
        }

        next(createSuccess(200, "You has been registered successfuly"))
        await newUser.save()
    }
    catch (err) { next(err) }
}


const loginHandler = async (req, res, next) => {
    try {
        const user = await UsersModel.findOne({ username: req.body.username })


        if (!user) return next(createError(404, "User Not Found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong Password Or User Name"))

        const token = jwt.sign({ id: user._id, admin: user.isAdmin }, process.env.JWT);

        const { username, password, ...otherDetails } = user._doc
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({ ...otherDetails })

    } catch (err) { next(err) }
}



export { registerHandler, loginHandler }