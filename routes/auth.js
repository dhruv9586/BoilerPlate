import UsersService from '../services/users'
import token from '../utils/token';

export default class Auth {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {

        this.router.post(
            '/auth/register',
            this.registerUser.bind()
        );

        this.router.post('/auth/login', this.login.bind());

    }

    registerUser(req, res, next) {
        UsersService.findByEmail(req.body.email.id)
            .then(found => !found
                ? UsersService.createUser(req.body)
                : found
            )
            .then(user => res.status(200).send(user))
    }

    login(req, res, next) {
        UsersService.findByEmail(req.body.email)
            .then(user => !user
                ? res.status(401).send("User Not found")
                : [user, user.compareHashPassword(req.body.password)]
            )
            .then(([user, isValid]) => {
                if (!isValid) {
                    return res.status(403).send({ message: "Given Password is not matched" })
                }
                return [user, token.generateToken(user)]
            })
            .then(([user, token]) => {
                let data = {
                    user,
                    token,
                    message: "Succesfully logged in"
                }
                return res.status(200).send(data);
            })
    }
}