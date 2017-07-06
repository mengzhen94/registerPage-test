const express = require('express'),
      app = express(),
      fs = require('fs'),
      path = require('path'),
      bodyParser = require('body-parser');

// Point static path to dist => angular
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

app.post('/', (req, res) => {

    fs.readFile(__dirname + "/post.json", 'utf8', (err, data) => {
        if (err) throw err;
        if(data === ""){
            let obj = [];
            obj.push(req.body);
            obj = JSON.stringify(obj);
            fs.writeFile(__dirname + "/post.json", obj, (err) => {
                if(err) {
                    return err;
                }
                res.send('Registered Successfully!');
            }); 
        }else{
            let isRegistered = false;
            let obj = JSON.parse(data);

            for (let value of obj) {
                if(value.userName === req.body.userName){
                    console.log('The usename has been registered!');
                    isRegistered = true;
                    break;
                }
            } 

            if(isRegistered === true) {
                res.status(304).json("The usename has been registered!");
            }else{
                obj.push(req.body);
                obj = JSON.stringify(obj);
                fs.writeFile(__dirname + "/post.json", obj, function(err) {
                    if(err) {
                        return err;
                    }
                    res.send('Registered Successfully!');
                });
            }             
        } 
        
    })
});

app.listen(8080, () => {
  console.log('Register app listening on port 8080!');
});