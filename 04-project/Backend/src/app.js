const express = require('express')
const postModel = require('./models/post.model')
const multer = require('multer')
const uploadFile = require('./services/storage.service')
const cors  = require('cors')

app = express();
app.use(cors())
app.use(express.json())

const upload = multer({storage: multer.memoryStorage()})
//create post
app.post('/create-post',upload.single("image"), async (req,res)=>{
    console.log(req.body)
    console.log(req.file)

    const result = await uploadFile(req.file.buffer);
    const post = await postModel.create({
        image : result.url,
        caption: req.body.caption
    })

    res.status(201).json({
        message : "Post created",
        post
    })
})

app.get('/posts', async (req,res)=>{
    const post = await postModel.find();

    res.status(200).json({
        message: "Data fetch successful",
        post
    })
})




module.exports = app