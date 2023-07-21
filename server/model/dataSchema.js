const mongoose = require('mongoose');
const moment = require('moment-timezone');

const ReactFormDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: moment.tz("Asia/Kolkata").format('HH:mm:ss DD-MM-YYYY') 
    }
});

const User = mongoose.model('User', ReactFormDataSchema);
module.exports = User;
