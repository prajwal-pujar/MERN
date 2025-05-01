const express = require('express');
const router = express.Router();
const User = require('../modules/User')
const { check, validationResult }
    = require('express-validator');
const bodyparser = require('body-parser')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtsecreat = "i am a good boy"
const fetchuser = require("../middlware/login")






router.post('/signin' , [
    check('name', 'Name length should be 10 to 20 characters')
                    .isLength({ min: 2 , max: 20 }),
    check('email', 'Email length should be 10 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .isLength({ min: 5 , max: 10 })
] , async(req,res)=>{

try{
        const errors = validationResult(req);
 
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {name , email , password , image} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
       
 
    
        const user = new User({
        name ,  email , password : hash , image
         })
        const data = await user.save()
        var token = jwt.sign({ user : data._id }, jwtsecreat);
      res.json({data.name , data.image , token})
    }
    catch(err){
        res.send(err)
        res.status(500).json({ error: "Internal Server Error" });
    }
    
})



router.post('/login' ,[
    check('email', 'Email length should be 10 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .isLength({ min: 5 , max: 10 })
] , async(req,res)=>{

    try{
        const errors = validationResult(req);
 
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email , password} = req.body
        const user = await User.findOne({ email }, { password: 1, _id: 0 });

        if(!user){
            return res.status(400).json({ errors: "EMIAL DOESNOT EXIST" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: "PASSWORD DOESNOT MATCH" })
        }
        else
        {
            const user = await User.findOne({ email }, { password: 1, _id: 1 });
            var token = jwt.sign({ user : user._id }, jwtsecreat);
            res.json({user.name , user.image , token})
        }   
    }
    catch(err){
        res.send(err)
        res.status(500).json({ error: "Internal Server Error" });
    }
    
})

router.get('/getuser' ,fetchuser, async(req,res)=>{
    try{
        const user = req.user
        console.log(user)
        const data = await User.findOne({ _id: user });
        res.json(data);
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" });
    }
    
})

module.exports = router
