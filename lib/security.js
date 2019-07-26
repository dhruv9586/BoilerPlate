import security from "../utils/token"

const verifyToken = function (req, res, next) {
    security.verifyToken(token, next)
        .then(decoded => {
            return UsersService.findById(decoded.sub)
        })
        .then(user => {
            if (!user) {
                next(new Error("User Not found"))
            }
            req.user = user
            return next(req)
        })
}


export default {
    verifyToken
}