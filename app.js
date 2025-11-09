const express = require('express')
const app = express()
const db = require('./config/db')
const cookieParser = require('cookie-parser')

let PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static("public"))

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server is running on port : ${PORT}`);
    
})