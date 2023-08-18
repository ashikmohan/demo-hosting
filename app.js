const express=require('express');
const app=new express();
const morgan=require('morgan');
const cors= require('cors');
const jwt=require('jsonwebtoken');

require('./db/index')
const api=require('./router/employees')

require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/api',api)

// user
app.post('/login',async (req,res)=>{
try {
    console.log(req.body)
    var email=req.body.email;
    var pwd=req.body.password;

    if(email=='abc123@gmail.com' && pwd=='abcd1234'){
        // normal user login
        let payload={email:email,password:pwd};
        let token=jwt.sign(payload,'secretkey')
        res.status(200).send({message:'Success',token:token,isAdmin:false});
    }
    else{
        res.status(404).send({message:'Unauthorised'});
    }
} catch (error) {
    res.status(404).send({message:'Not Found'})
}

})


//admin

app.post('/adminlogin',async (req,res)=>{
try {
    console.log(req.body)
    var email=req.body.email;
    var pwd=req.body.password;

    if(email==='admin123@gmail.com' && pwd ==='admin123'){
        //admin user login
        let payload={email:email, password:pwd};
        let adminToken=jwt.sign(payload,'adminsecretkey');
        res.status(200).send({message:'Admin Sucess',adminToken:adminToken,isAdmin:true});
    }
    else{
        res.status(404).send({message:'Unauthorised'});
    }
} catch (error) {
    res.status(404).send({message:'Not Found'})
}

})

const path=require('path');

app.use(express.static(path.join(__dirname,'docs')))

app.get('*', async(req,res)=>{
    res.sendFile(path.join(__dirname,'docs','index.html'))
});



app.listen(5000,()=>{
    console.log(`server started`)
});