const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');


app.use(express.json())

Users=[{"user_id":1234, "Account_balance":5000},{"user_id":4321,"Account_balance":10000}]





app.post('/fundTransfer', (req, res) => {
let {user_reciver,user_sender,fund_amount} = req.body
let sender_obj = Users.find(user => user.user_id === user_sender)
let reciver_obj = Users.find((user)=>user.user_id === user_reciver)


if(!sender_obj || !reciver_obj )
{
  res.status(400).json({message:'sender or reciver not exsiting'})

}


if(fund_amount > sender_obj.Account_balance){
  res.status(401).json({message:'insufficent funds'})


}
else{

reciver_obj = Users.find((user)=>user.user_id === user_reciver)
if(reciver_obj){
      reciver_obj.Account_balance = reciver_obj.Account_balance + fund_amount 
  sender_obj.Account_balance = sender_obj.Account_balance - fund_amount
  res.status(200).json({message:"fund transfered successfully",remaining_balance : sender_obj.Account_balance })
}
else{
    res.status(401).json({message:'user not found'})
}
console.log(Users)
}})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
