const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function registerUser(req,res) { // access user from database
    const {username, email, password , role="user"} = req.body;

    const isUserAlreadyExist = await userModel.findOne({ // check user 
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "User already exixt"
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({ // create user
        username,
        email,
        password: hash,
        role
    })
    //create token
    const token = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET)
    //set or send token
    res.cookie("token", token)

    res.status(201).json({
        message : "user register successfully",
        user: {
            id: user._id,
            username : user.username,
            email: user.email,
            role: user.role,
        }
    })
}

async function loginUser(req,res) {
    const {username, email, password} = req.body;
    const user = await userModel.findOne({
        $or:[
            {username},
            {email},
        ]
    })
    if(!user){
        return res.status(401).json({
            message: "Invalid cerdentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid Password"
        })
    }
    
    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User login successfully",
        user:{
            username : user.username,
            email : user.email,
            role : user.role
        }
    })

}

module.exports = {registerUser, loginUser};