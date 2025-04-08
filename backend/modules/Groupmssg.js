const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GruopmssgSchema = new mongoose.Schema({
    
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Group'
    },
    name : {
        type:String,
        required : true
    },
    text:{
        type: String,
        required:true
    },
    users:{
        type: Array,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

const Groupmssg = mongoose.model('Groupmssg', GruopmssgSchema);
module.exports = Groupmssg;