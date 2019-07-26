import UsersService from '../services/users'
import security from '../lib/security'
import token from '../utils/token'

export default class User {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get(
            '/user/profile/view/me',
            token.verifyToken.bind(this),
            this.getMyProfile.bind(this)
        );

        this.router.post(
            '/user/profile/edit',
            token.verifyToken.bind(this),
            this.updateProfile.bind(this)
        );

        this.router.post(
            '/user/password/change',
            token.verifyToken.bind(this),
            this.changePassword.bind(this)
        );

    }

    updateProfile(req, res, next) {
        UsersService.updateProfile(req.user._id, req.body)
            .then(user => res.status(200).send(user))
            .catch(next)
    }

    getMyProfile(req, res, next) {
        return res.send({ user: req.user });
    }

    changePassword(req, res, next) {
        let user = req.user
        let { oldPassword, newPassword } = req.body
        if (!user.compareHashPassword(oldPassword)) {
            return res.status(403).end("Old password is not correct")
        }

        user.password = newPassword
        user.save(err => {
            return err
            ? res.status(505).send("Internal server error")
            : res.status(200).send("Succesfully Password changed")
        })
    }
}