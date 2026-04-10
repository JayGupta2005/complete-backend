const mongoose = require('mongoose');

async function connectDB(){
    //CLUSTER TK KI URI
    //mongodb+srv://yt:hlZFSnVAs2qnILGj@yt-complete-backend.sit429d.mongodb.net/
    //NOW SERVER TO DB CONNECTION NOT TO CLUSTER [DATABASE NAME - halley]
    //mongodb+srv://yt:hlZFSnVAs2qnILGj@yt-complete-backend.sit429d.mongodb.net/halley
    //mongoose.connect is a powerful function agar halley nam ka DB nhi hai to create kr ke connect ho jayegi
    await mongoose.connect('mongodb+srv://yt:hlZFSnVAs2qnILGj@yt-complete-backend.sit429d.mongodb.net/halley');
    console.log("Connected to DB")
}

module.exports = connectDB;