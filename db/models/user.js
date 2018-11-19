const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/grami/image/upload/v1540820982/rgm4xppemxulnyvnsucm.webp"
    }
});

module.exports = mongoose.model('user', userSchema);