const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.json());



// Sample data as an initial list
let objectList = [
    
  ];



  // GET endpoint to retrieve the list of objects
app.get('/objects', (req, res) => {
    res.json(objectList);
  });


  // POST endpoint to add a new object to the list
app.post('/objects', (req, res) => {
    const newObject = req.body;
     // Assign a unique ID (you may want to use a database for more robust ID generation)
  
  objectList.push(newObject);
  //objectList.push(newObjectid);

  res.status(201).json(newObject);
  
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/todolist', (req, res) => {
    res.send('gets you the list of works that need to be done')
  })






const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




app.use(bodyParser.json());

// Mock database for storing user data
const users = [];

// Secret key for JWT
const secretKey = 'your-secret-key'; // Change this to a strong, unique secret key

// Endpoint for user signup
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    if (users.some((user) => user.username === username)) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data (in a real app, use a database)
    const user = {
      username,
      password: hashedPassword,
    };

    users.push(user);

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = users.find((user) => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.get('/userslist', (req, res) => {
    res.json(users);
  });
