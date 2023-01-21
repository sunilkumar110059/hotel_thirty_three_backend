import jwt from 'jsonwebtoken';
import { createError } from './Error.js'

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid"))
        req.user = user;
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.admin) { next() }
        else {
            return next(createError(403, "User are not authorized"))
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user)
        if (req.user.admin) { next() }
        else {
            return next(createError(403, "Admin are not authorized"))
        }
    })
}



export { verifyToken, verifyUser, verifyAdmin }