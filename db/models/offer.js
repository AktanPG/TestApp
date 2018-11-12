const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    creater: {
        type: String,
        required: true
    },
    images: {
        type: [
            ImageData
        ]
    },
    const: {
        type: String,
        required: true
    },
    constType: {
        type: String,
        required: true
    },
    Seller: {
        type: String,
        required: true
    },
    City: {
        type: String
    },
    Phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    Date: {
        type: String,
        default: Date.now
    },
    Looks: {
        type: Number,
        default: 0 
    }
});

module.exports = mongoose.model('offer', offerSchema);