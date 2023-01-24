import express from 'express';
import { updateUser, deleteUser, getUser, getAllUser } from '../Controller/UsersController.js';
import { verifyUser, verifyAdmin } from '../Utils/VerifyToken.js';

const usersRoute = express.Router();

// usersRoute.get('/checkauthentication', verifyToken, (req, res) => {
//     res.json({ msg: "Hello user you are login " })
// })

// usersRoute.get('/checkuser/:id', verifyUser, (req, res) => {
//     res.json({ msg: "Hello user you are login and You can delete account " })
// })

// usersRoute.get('/checkadmin/:id', verifyAdmin, (req, res) => {
//     res.json({ msg: "Hello Admin you are login and You can delete account " })
// })


usersRoute.put('/:id', verifyUser, updateUser);
usersRoute.delete('/:id', verifyUser, deleteUser);
usersRoute.get('/:id', verifyUser, getUser);
 // usersRoute.get('/', verifyAdmin, getAllUser)
 usersRoute.get('/', getAllUser)
export default usersRoute