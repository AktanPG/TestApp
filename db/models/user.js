const mongoose = require('mongoose');

//mongoose`s schema for users collection

const userSchema = new mongoose.Schema({
    name: {
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
    },
    publicId: {
        type: String
    }
});

module.exports = mongoose.model('user', userSchema);