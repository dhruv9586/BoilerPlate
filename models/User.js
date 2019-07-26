import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

let schema = new mongoose.Schema({
    name: {
        first: String,
        last: String,
    },
    email: {
        id: {
            type: String,
            unique: true,
            lowercase: true,

        },
        is_verified: {
            type: Boolean,
            default: false
        }
    },
    password: { type: String },
    phone: {
        number: {
            type: Number,
            unique: true
        },
        is_verified: {
            type: Boolean,
            default: false
        }
    }
});

schema.pre('save', function (next) {
    const password = this.password
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(password, salt)
    }
    next()
})

schema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

schema.methods.compareHashPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', schema)