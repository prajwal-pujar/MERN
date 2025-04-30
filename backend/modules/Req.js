const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReqSchema = new mongoose.Schema({
    senderid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    receiveid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    image: {
        type : String,
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

const Req = mongoose.model('Req', ReqSchema);
module.exports = Req;
