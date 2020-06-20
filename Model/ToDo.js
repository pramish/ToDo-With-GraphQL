const mongoose = require('mongoose')
const ToDoSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    status:{
        type: String,
        default: "Not Started",
        required:true
    },
})
module.exports = mongoose.model('ToDo',ToDoSchema)