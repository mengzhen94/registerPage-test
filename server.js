/**
 * @file server
 * @description 
 *  import express module and create app
 *  read and write json file 
 */

const express = require('express'),
      app = express(),
      fs = require('fs'),
      path = require('path'),
      bodyParser = require('body-parser');

// Point static path to dist => angular
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

app.post('/', (req, res) => {

    // Read JSON file
    fs.readFile(__dirname + "/post.json", 'utf8', (err, data) => {
        if (err) throw err;
        // If the file is blank, create new array and push form value to it
        if(data === ""){
            let obj = [];
            obj.push(req.body);
            obj = JSON.stringify(obj);
            // Write form value to JSON file
            fs.writeFile(__dirname + "/post.json", obj, (err) => {
                if (err) throw err;
                res.send('Registered Successfully!');
            }); 

        }else{
            let isRegistered = false;

            // Parses a JSON string, constructing the JavaScript object
            let obj = JSON.parse(data);

            // Check if the username is already registered
            for (let value of obj) {
                if(value.userName === req.body.userName){
                    console.log('The usename has been registered!');
                    isRegistered = true;
                    break;
                }
            } 

            // If the username is already registered, return 304 status 
            if(isRegistered === true) {
                res.status(304).json("The usename has been registered!");

            }else{
                // If the username is not already registered, write JSON file and return 200 status
                obj.push(req.body);
                obj = JSON.stringify(obj);
                fs.writeFile(__dirname + "/post.json", obj, function(err) {
                    if (err) throw err;
                    res.send('Registered Successfully!');
                });
            }             
        } 
        
    })
});

app.listen(8080, () => {
  console.log('Register app listening on port 8080!');
});