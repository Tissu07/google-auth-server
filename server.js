const express = require('express');
const cors = require('cors');
const cookiesParser = require('cookie-parser');
require('dotenv').config();
const passport = require('passport');
const connectDB = require('./db');

const authRoute = require('./routes/authRoute')

const app = express();

connectDB();

require('./config/passport')

app.use(cors({
    origin: process.env.UI_URL,
    credentials: true
}))

app.use(passport.initialize())

app.use(cookiesParser());
app.use(express.json());

//route
app.use('/auth', authRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))