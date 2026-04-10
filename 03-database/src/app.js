const express = require('express');
const noteModel = require('./models/note.model')
const app = express();
app.use(express.json())
//NOW CREATE ALL 4 APIS FOR NOTE APPLICATION 
app.post('/notes', async (req,res)=>{
    const data = req.body // {title, description}
    await noteModel.create({
        title : data.title,
        description : data.description
    })
    res.status(201).json({
        message: "Note created successfully"
    })
})
//Fetch all notes
app.get('/notes', async (req,res)=>{
    const notes = await noteModel.find();//Always return array

    res.status(200).json({
        message : "Note fetch",
        notes : notes
    })
})

//Delete node
app.delete('/notes/:id', async (req,res)=>{
    const id = req.params.id;
    await noteModel.findOneAndDelete({
        _id : id
    })

    res.status(200).json({
        message: "Node Deleted"
    })
})
//Update note
app.patch('/notes/:id', async(req,res)=>{
    const id = req.params.id
    const description = req.body.description
    await noteModel.findOneAndUpdate({
        _id : id 
    },{
        description : description
    })

    res.status(200).json({
        message : "Note updated"
    })
})


module.exports = app;