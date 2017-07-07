# Register Page Web Application

This project is a simple web based application allowing users to register an account with only a username and password.
I am using Angular and Node.js to do the project. Valid username and password is written to **post.json** file.


## Quick Start
**Make sure you have Node version v8.1.3, NPM < 5 like version 4.6.1 and Angular version 4**
```bash
# clone our repo
git clone https://github.com/mengzhen94/registerPage-test

# change directory to our repo
cd registerPage-test

# install the repo and depedency with npm
npm install

# start the server
# First we need to bulid the Angular source file using "ng build", then we run node server file using "node server.js"
# To make it easy, I have defined a script task for it the package.json: "server": "ng build && node server.js"
npm run server

# open the application
Navigate to http://localhost:8080/.

```

## Test
```bash
npm test
```

## Usage and Screenshots of the application 

Username and password validation

<img src="https://user-images.githubusercontent.com/17734819/27921077-9b6df90e-6244-11e7-8120-c197b155f6f0.png" width="500">

Successfully registered

<img src="https://user-images.githubusercontent.com/17734819/27920763-a60f820c-6243-11e7-809a-4117438b2814.png" width="500">

Username is already registered

<img src="https://user-images.githubusercontent.com/17734819/27921086-a58e0712-6244-11e7-88f4-79d375c4e3c9.png" width="500">

