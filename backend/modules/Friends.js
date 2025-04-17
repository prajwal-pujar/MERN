const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    friendid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const friend = mongoose.model('friend', friendSchema);
module.exports = friend;