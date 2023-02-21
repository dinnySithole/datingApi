
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');

const app = express();

const userRouter = require('./api/users/user.router');

app.use(express.json());

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/api/users', userRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running", process.env.APP_PORT);
});