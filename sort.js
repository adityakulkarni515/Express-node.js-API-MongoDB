const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.json());

function sortthearray(arr){
    arr.sort((a, b) => a - b);

    return arr
}


app.post('/sortedarray', (req, res) => {
    const unsortedarray=req.body.array
    let sortedarray=sortthearray(unsortedarray)
    res.status(200).json({Sortedarray:sortedarray})
  })


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  