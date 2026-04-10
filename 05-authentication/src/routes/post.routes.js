const express = require('express')

const router = express.Router()

router.post('/create', (req,res)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unauthoried user"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
    }catch(err){
        return res.status(401).json({
            message: "token is invalid"
        })
    }

    res.send('post created successful')

})

module.exports = router;