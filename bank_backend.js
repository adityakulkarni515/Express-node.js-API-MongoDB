const express = require('express')
const app = express()
const port = 3000

let users_info = []
let users_cred = []
app.use(express.json());


app.post("/useronboarding", (req, res) => {
    let user = req.body 
    if(user.name , user.pan_no, user.phone_no, user.adhaar_no){
        user.account_no = Math.floor(100000000000 + Math.random() * 900000000000); 
        user.user_id =  Math.floor(100000000 + Math.random() * 999999999);
        users_info.push(user)
        res.status(201).json({message: "user created succesfully",user_id : user.user_id, account_no: user.account_no})
        console.log(users_info)
    }
    else{
        res.status(400).json({message: "enter all the user details"})
    }    
})
app.post("/generatePassword", (req,res)=>{
       let {user_id,password} = req.body
       let user2=users_cred.find((user2)=> user2.user_id === user_id)
       let user = users_info.find((user)=> user.user_id === user_id)
       

    if (user2){

        res.status(400).json({Message:"User has already exist"})


    }
     else{

      if (user){
      users_cred.push(user)

      res.status(201).json({Message: 'User Signed Up successfully'})
      }

      else{
        res.status(400).json({Message:'User Id not found'})
      }

    }

})




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  