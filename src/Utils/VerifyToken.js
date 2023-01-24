import jwt from 'jsonwebtoken';
import { createError } from './Error.js';

const verifyUser = (req, res, next) => {
    const token = req.cookies.ACCESS_TOKEN;
    if (!token) {
        return next(createError(401, "You have not authorized Token Please Register"))
    }
    // token verification
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) { return next(createError(403, "Token is not valid")) }
        if (user.id === req.params.id || req.admin) { return next() }
        else {
            return next(createError(403, "User are not authorized for this ID"))
        }
    })
}

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.ACCESS_TOKEN;
    if (!token) {
        return next(createError(401, "You have not authorized Token"))
    }
    // token verification
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) { return next(createError(403, "Token is not valid")) }
        if (user.admin) { return next() }
        else {
            return next(createError(403, "Admin are not authorized for this ID"))
        }
    })
}

export { verifyUser, verifyAdmin }