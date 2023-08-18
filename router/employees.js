const router=require('express').Router()
const employeeData= require('../models/employee')

//! CRUD 
//*CREATION
router.post('/edit', async (req, res) => {

    try {
        let item = req.body
        const saveddata = await employeeData(item); //crosschecking the criteria before saving
        saveddata.save();

        res.json({message:'success', status: 201}).status(201)

    } catch (error) {
        console.log(error)
        res.json({message:'failed', status: 400}).status(400)
    }


})


//*READING 

router.get('/getItem', async (req, res) => {
    try {

        let data = await employeeData.find({})
        res.json({data:data, status: 200}).status(200)

    } catch (error) {
        console.log(error)
        res.send('error')
    }
})

//*READING ONE DATA

router.get('/getOneItem/:id', async (req, res) => {
    try {


        let id = req.params.id
        let data = await employeeData.findById(id)
        res.json({data:data, status: 200}).status(200)

    } catch (error) {
        console.log(error)
        res.send('error')
    }
})


//*UPDATING


router.put('/editItem/:id', async (req, res) => {
    try {
        let id = req.params.id
        let updateData = {$set: req.body}

        const updated = await employeeData.findByIdAndUpdate(id, updateData)

        res.json(updated)

    } catch (error) {
        console.log(error)
        res.send('error')
    }
})









module.exports=router