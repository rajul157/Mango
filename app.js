//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.listen(process.env.PORT , function() {
  console.log("Server is running on port 3000");
});

app.use(express.static("public"));

app.get("/", function(request , response) {
  response.sendFile(__dirname + "/signup.html");
});

//Send data submitted by user back
app.use(bodyparser.urlencoded({ extended: true}));

//Post Method
app.post("/", function(req, res) {

  // const name = req.body.name;
  // const  email = req.body.email;
  // const password = req.body.password;
  // console.log(name + " " + email + " " + password);
    var data = {
    members: [{
      email_address: req.body.email,
      status: "subscribed",
      merge_fields: {
        NAME: req.body.name
      }
    }]
  };
 var jsonData = JSON.stringify(data);
 const url = "https://us16.api.mailchimp.com/3.0/lists/2f25892dcb";
 const options ={
   method : "POST",
   auth : "rajul2:03c62197071634c4049206b4bec2d805-us16"
 };

 const request = https.request(url, options , function(response){
   console.log(response.statusCode);
   if(response.statusCode ===200){
   res.sendFile(__dirname + "/success.html");
 }else{
   res.sendFile(__dirname + "/failure.html");
 }
   response.on("data", function(data){
     console.log(JSON.parse(data));
   });
});
request.write(jsonData);
request.end();
});

//API Key
//03c62197071634c4049206b4bec2d805-us16
// List ID :2f25892dcb
