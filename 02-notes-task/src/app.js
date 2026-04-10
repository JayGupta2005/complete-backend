const express = require('express');
const app = express();
app.use(express.json());
const notes = [];
app.post('/notes',(req,res)=>{ // API CREATED NAMES AS /notes
    // console.log(req.body)
    notes.push(req.body)
    res.status(201).json({
        message: "note created successfully"
    })
})
//now create a API where user can see all the notes created by himself
app.get('/notes', (req,res)=>{
    res.status(200).json({
        message : "Notes fetch successfully",
        notes : notes
    })
})
//delete data from server
app.delete('/notes/:index', (req,res)=>{
    const index = req.params.index;
    delete notes[index];

    res.status(200).json({
         message : "Note deleted successtfully"
    })
})
// now updating data of node
app.patch("/notes/:index", (req,res)=>{
    const index = req.params.index;
    const description = req.body.description;
    if (!notes[index]) {
        return res.status(404).json({
            message: "Note not found"
        });
    }
    notes[index].description = description;
    res.status(200).json({
        message: "Note updeate successfully"
    })
})
// update title
// app.patch("/notesTitle/:index", (req,res)=>{
//     const index = req.params.index;
//     const title = req.body.title;
//     if (!notes[index]) {
//         return res.status(404).json({
//             message: "Note not found"
//         });
//     }
//     notes[index].title = title;
//     res.status(200).json({
//         message : "Title update Successfully"
//     })
// })

module.exports = app;