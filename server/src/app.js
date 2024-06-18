import express from 'express';
import session from 'express-session';
import passport from 'passport';
import connect from './database/mongoConnection.js';
import dotenv from 'dotenv';
import authRoute from './authentication/authRoutes/authRoutes.js';

dotenv.config();

connect();

const server = express();

server.use(express.json())

server.use(express.urlencoded({ extended: true }))

server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

server.use(passport.initialize())

server.use(passport.session())

server.use('/auth', authRoute)

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});