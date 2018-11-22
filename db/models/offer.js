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
        type: Number,
        required: true,
        default: 0
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
    date: {
        type: String,
        default: Date.now
    },
    looks: {
        type: Number,
        default: 0 
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('offer', offerSchema);