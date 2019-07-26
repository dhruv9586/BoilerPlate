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
    }

    updateProfile(req, res, next) {
        UsersService.updateProfile(req.user._id, req.body)
            .then(user => res.status(200).send(user))
    }

    getMyProfile(req, res, next) {
        console.log("user-----------------")
        return res.send({ user: req.user });
    }
}