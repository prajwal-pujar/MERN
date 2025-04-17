const mongoose = require('mongoose');

const GruopSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    creator:{
        type: String,
        required: true
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

const Group = mongoose.model('Group', GruopSchema);
module.exports = Group;