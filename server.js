//Imports
import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

import { getComments, addComment, deleteComment } from './controllers/commentController.js';
import { isAuthenticated, loginUser, registerUser } from './controllers/usersController.js';


const app = express();
const PORT = 5000;

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}))

// App use
app.use(express.json());
app.use(express.static('public'));


// Home apps
app.get('/', (req, res) => {
  res.send('Home page')
})

// Users apps
app.get('/register', (req, res) => {
  res.send('Registration page')
})
app.get('/login', (req, res) => {
  res.send('Login page')
})
app.post('/register', registerUser);
app.post('/login', loginUser);

app.post('/logout', (req, res) => {
  if (!req.session.userId) {
    return res.status(403).json({ error: 'Not logged in' });
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed '});
    }
    res.json({ message: 'Logged out succsessfully' });
  });
});

// TESTING SESSION DELETE LATER
app.get('/check-session', (req, res) => {
  console.log('Session:', req.session);

  if (req.session.userId) {
    res.json({ loggedIn: true, userId: req.session.userId });
  } else {
    res.json({ loggedIn: false });
  }
});
//

// Comments controllers
app.get('/api/comments', getComments);
app.post('/api/comments', addComment);
app.delete('/api/comments/:id', deleteComment);





// DONT TOUCH THAT!
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})
