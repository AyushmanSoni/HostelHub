const express = require("express");
const fs = require('fs');
const ticket_model =require('./models/ticketschema')
const student_information = require('./models/studentinfo')
const app =express();
const port = 8000;

const {connect} = require('./connection')

app.use(express.urlencoded({extended:false}));

const dataMap = new Map();
fs.readFile('password.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    try {
      const lines = data.trim().split('\n');
      lines.forEach(line => {
      const [key, value] = line.trim().split(' ');
      dataMap.set(key, value);
    });
    console.log(dataMap);   
}
    catch (err) {
        console.error('Error parsing data:', err);
    }
});

app.use(express.urlencoded({extended:false}));

connect('mongodb://127.0.0.1:27017/project_hostel_all');

app.use((req,res,next)=>{
    if(req.params){
        next();
    }
    else{
        console.log("enter data");
        res.json("enter data");
        res.end();
    }
})

app.get('/login', async (req ,res)=> {
    // console.log(req.body)   
    // console.log(req.body.id);
    // console.log(req.body.pass);

    if (dataMap.get(req.body.id)==req.body.pass) {
        // res.redirect();
        res.send("login done");
    }
    else{
        res.send({message:"failed"});
    }
    res.end();
})


app.post('/compliant', async(req,res)=>{
    var t = req.body;
    var room_nu = t.room;
    var complaint = t.complaint;
    var issue_type = t.issue_type;

    console.log(room_nu);
    console.log(complaint);

    const result = ticket_model.create({
        room_number: room_nu,
        problem : complaint,
        issue_type: issue_type
    })

    res.send("done");

    res.end();
})

app.listen(port , ()=> console.log("server started at port " + port));




