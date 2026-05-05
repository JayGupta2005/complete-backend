import userModel from "../models/user.model";
import crypto from 'crypto';
async function register(req,res) {
    const {username, email, password} = req.body;

    const isAlreadyRegister = await userModel.findOne({
        $or:[
            {username},
            {password}
        ]
    })

    if(isAlreadyRegister){
        res.status(409).json({
            message: "Username or email is already exist"
        })
    }

    const hashPassword = crypto.createHash('sha26').update(password).digest('hex');

}