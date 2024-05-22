const express = require("express");
const { createTodo , updateTodo} = require("./types");
const {todo} = require("./db");
const app=express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// body{
//     title: String,
//     description : String
// }

app.get("/todos" , async function(req , res) {
    const alltodos = await todo.find({});
    res.json({
        alltodos
    })
})

app.post("/todo" , async function(req , res){
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        return res.status(411).json({
            msg : "You have sent wrong inputs."
        })
    }
    //put in the the db
    await todo.create({
        title:createPayload.title,
        description : createPayload.description,
        completed: false
    })
    res.json({
        msg : "Todo is Created."
    })
})


app.put("/completed" , async function(res, res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        return res.status(411).json({
            msg : "You have sent wrong inputs."
        })
    }
    await todo.update({
        _id: req.body.id
    },{
        completed : true
    })
    res.json({
        msg : "Todo marked as completed"
    })
})

app.listen(3000);