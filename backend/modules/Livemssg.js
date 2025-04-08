const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MssgSchema = new mongoose.Schema({
    senderid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    receiveid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Mssg = mongoose.model('Mssg', MssgSchema);
module.exports = Mssg;