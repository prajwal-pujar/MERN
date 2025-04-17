const express = require("express");
const mongoose = require('mongoose');

const mongoDBURL = process.env.MONGODB_URL || 'mongodb+srv://prajwalpujar24:12345@livemmsg.vxzeyvv.mongodb.net/?retryWrites=true&w=majority&appName=LIVEMMSG';

const connect = () => {
    return mongoose.connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.error("Connection Error:", err));
  };

module.exports = connect
  
