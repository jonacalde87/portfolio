const express = require("express")
const app = express()
require("dotenv").config(); //authentication
const expressJwt = require("express-jwt"); //authentication
const morgan = require("morgan")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 9000

app.use(morgan("dev"))
app.use(express.json())

//connect to db
mongoose.set("useCreateIndex", true)
mongoose.connect(
    "mongodb://localhost:27017/todo-auth-example",
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true },
    (err) => {
        if (err) throw err
        console.log("Connected to the database")
    }
)


//authentication route
app.use("/auth", require("./routes/auth")) //auth
app.use('/api', expressJwt({ secret: process.env.SECRET,  algorithms: ['HS256'] })) // authentication; protect todo; you will need a token to access todo
// Add `/api` before your existing `app.use` of the todo routes.
// This way, it must go through the express-jwt middleware before
// accessing any todos, making sure we can reference the "currently
// logged-in user" in our todo routes.
app.use("/api/todo", require("./routes/todo")); 

app.use((err, req, res, next) => {
    console.log(err)
    //auth error handling
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({message: err.message})
})

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`)
})

//to sign up: POST req
//http://localhost:5000/auth/signup >> then sent post request with username and password 
// {
//     "username": "bob", 
//     "password": "bob123"
// }

//to sign in: POST req
//http://localhost:5000/auth/login/
// {
//     "username": "alosha", 
//     "password": "alo123"
// }

//add item to a user: post req
//get LOGIN token >> http://localhost:5000/api/todo
// in the body: 
// {
//     "title": "buy milk"
// }
//go to headers type autorization in empty key. Value is Bearer + login token >> submit post req

//can use get, post, edit(http://localhost:5000/api/todo/<id>), delete((http://localhost:5000/api/todo/<id>))
