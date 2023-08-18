const mongoose = require('mongoose')
const employeeSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Designation:{
        type:String,
        required:true,
    },
    Location:{
        type:String,
        required:true
    },
    Salary:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const employeeModel = mongoose.model('Employee', employeeSchema)
module.exports =employeeModel