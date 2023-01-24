import jwt from 'jsonwebtoken';
import { createError } from '../Error.js'

const verifyToken = (req, res, next) => {
    const token = req.cookies.ACCESS_TOKEN;
    if (!token) {
         return next(createError(401, "You have not authorized Token"))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid"))
        req.user = user;
        next()
    })
}


const verifyUser = (req, res, next) => {

    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.admin) { next() }
        else {
            return next(createError(403, "User are not authorized"))
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        console.log("next==", next)
        if (req.user.admin) { next() }
        else {
            return next(createError(403, "Admin are not authorized"))
        }
    })
}



export { verifyUser, verifyAdmin }