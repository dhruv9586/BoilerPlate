import User from '../models/User'
import { ObjectID } from 'mongodb';

class UsersService {
    constructor() { }

    async findById(id) {
        if (!ObjectID.isValid(id)) {
            return Promise.reject('Invalid identifier');
        }
        const userObjectID = new ObjectID(id);
        return await User.findById(userObjectID)
    }

    findByEmail(email) {
        if (!email) {
            return Promise.reject("Provide Email")
        }
        return User.findOne({ "email.id": email })
            .then(user => user)
    }

    createUser(data) {
        return User.create(data).then(created => created)
    }

    updateProfile(id, data) {
        if (!ObjectID.isValid(id)) {
            return Promise.reject('Invalid identifier');
        }
        const userObjectID = new ObjectID(id);
        return User.updateOne({ _id: userObjectID }, { $set: data })
            .then(user => user)
    }
}


export default new UsersService()