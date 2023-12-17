const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mongoose = require('mongoose');
app.use(express.json())


mongoURI='mongodb://127.0.0.1:27017/mymongo'

// Connect to MongoDB
mongoose.connect(mongoURI)
.then(()=>console.log('connected to mongodb'))
.catch((err)=> console.log('mongo error',err))


//schema
const userSchema= new mongoose.Schema({

User_ID:{
    type:String,
    required : true,
},
password:{
    type:String,
    required:true
}
})

const User= mongoose.model('testcases', userSchema)

app.get('/getusers', async (req, res) => {
        
    const Testcase = await User.find({});

    console.log(Testcase)
    return res.status(200).json(Testcase);

  })


  

app.post('/finduser', async (req, res) => {

     let body= req.body

     console.log(body)

     check = await User.findOne({ User_ID:body.User_ID })

     if(check)
     {
        
        console.log(check)

    return res.status(200).json( {message :'User found',check})
     }

     else
     {
        res.status(400).json({message:"user not present in the mongo DB"})
     }

  
  })




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});