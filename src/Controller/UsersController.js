
import UsersModel from "../Models/UsersModel.js";


// ==== UPDATE USER
const updateUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const updatedUser = await UsersModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedUser)
    } catch (err) { next(err) }
}

// ==== DELETE USER
const deleteUser = async (req, res, next) => {
    try {
        await UsersModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Hotel has been deleted" })
    } catch (err) { next(err) }
}

// ==== GET ONE USER BY ID
const getUser = async (req, res, next) => {
    try {
        const findSingleUser = await UsersModel.findById(req.params.id)
        res.status(200).json(findSingleUser)
    } catch (err) { next(err) }
}

// ==== GET All USER 
const getAllUser = async (req, res, next) => {
    try {
        const findAllUsers = await UsersModel.find()
        res.status(200).json(findAllUsers)
    } catch (err) { next(err) }
}

export { updateUser, deleteUser, getUser, getAllUser }