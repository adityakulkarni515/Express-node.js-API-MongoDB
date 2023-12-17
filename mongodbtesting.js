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

const User= mongoose.model('users', userSchema)

app.post('/useraddition', async (req, res) => {
        let body=req.body
    if(!body ||!body.User_ID||!body.password)
      {
        return res.status(400).json({message: 'All the field are required'})
      }

      check = await User.findOne({ User_ID:body.User_ID  })

      if(check)
      {
      return res.status(400).json({message:"user already exist"})
      }


      const result = await User.create({

         User_ID : body.User_ID,
        password :body.password,

      });

      console.log('result', result)
     return res.status(201).json({msg: 'success'})
  })



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});