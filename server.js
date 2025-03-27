//Imports
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';

import commentsRoutes from './routes/commentsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';
import favouritesRoutes from './routes/favoritesRoutes.js';

const app = express();
const PORT = 5000;

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}))

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/users', usersRoutes);
app.use('/comments', commentsRoutes);
app.use('/games', gamesRoutes);
app.use('/favorites', favouritesRoutes); 

// HomePage
app.get('/', (req, res) => {
  res.send('Home page')
})


// app listen
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})
