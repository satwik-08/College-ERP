const express = require('express')
const cors = require("cors");
const app = express()
const port = process.env.PORT || 5000
const dbConnection = require('./db')
const User = require('./models/userModel')
app.use(express.json())
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result)
})

app.post("/login",async (req, resp) => {
    if(req.body.Id && req.body.password){
    let user= await User.findOne(req.body).select("-password");
    if(user){
    resp.send(user)
    }
    else{
        resp.send({result:"No User found"})
    }
}
else{
    resp.send({result:"No User found"})

}
})

app.use('/api/students/',require('./routers/studentRoute'))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))