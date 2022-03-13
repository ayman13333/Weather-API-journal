// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser=require('body-parser');
const cors=require("cors");
let app = express();


//this to create alocal host server on 3000 port

const port=3000;
app.listen(port, () => { 
  console.log(`Server Runing On: http://localhost:${port}`);
});
//added


app.use(cors());
//this makes server go throw website folder and execute all files in it
app.use(express.static('website'));
//this transform the data that server recieved to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// here we recieve data from client side
app.post('/post',(req,res)=>{
  console.log("post done");
  projectData={ ...req.body};
   //console.log(projectData);
   //throw post request server respond with nothing
   res.end();
})
 
//here we send data in get request
app.get('/get',(req,res)=>{
  console.log("get done");
  //server will send the project data object which recieved from post request
   res.send(projectData);
})

