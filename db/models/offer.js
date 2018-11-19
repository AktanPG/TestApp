const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    creater: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    cost: {
        type: String,
        required: true
    },
    costType: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    date: {
        type: String,
        default: Date.now
    },
    looks: {
        type: Number,
        default: 0 
    }
});

module.exports = mongoose.model('offer', offerSchema);