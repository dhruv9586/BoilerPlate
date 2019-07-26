import UsersService from '../services/users'
import jwt from 'jwt-simple'
import config from '../config/development'

export default {

    generateToken: function (user) {
        const timeStamp = new Date().getTime()
        const data = {
            sub: user.id,
            iat: timeStamp
        }
        return jwt.encode(data, config.JWT_SERCRET, { expireIn: "1d" })
    },

    verifyToken: async function (req, res, next) {
        const token = req.headers.authorization
        if (!token) {
            return next(new Error("Token is not provided"))
        }
        const decode = jwt.decode(token, config.JWT_SERCRET)
        if (!decode) {
            return next(new Error("Token not verified"))
        }

        req.user = await UsersService.findById(decode.subject)
        next()
    }
}