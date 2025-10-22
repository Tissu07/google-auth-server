const express = require('express');
const cors = require('cors');
const cookiesParser = require('cookie-parser');
require('dotenv').config();
const passport = require('passport');
const connectDB = require('./db');

const app = express();

connectDB();

app.use(cors({
    origin: process.env.UI_URL,
    credentials: true
}))

app.use(passport.initialize())

app.use(cookiesParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))