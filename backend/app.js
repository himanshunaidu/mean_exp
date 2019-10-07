const express = require('express');
var app = express();
const mongoose = require('mongoose');

//Connecting to mongodb atlas
/*mongoose.connect("<MONGODB ATLAS URL>",
  {useNewUrlParser: true})
  .then(()=>{
    console.log('Connected to Mongo');
  })
  .catch((err)=>{
    console.log('Connection failed '+err.stack);
  });*/

mongoose.connect("<MONGODB URL>", {useNewUrlParser: true})
  .then(()=>{
    console.log('Connected to Mongo');
  })
  .catch((err)=>{
    console.log('Connection failed '+err.stack);
  });

const User = require('./models/user');

const users = new Array(
  new User({_id: '123', username: 'Himanshu', password: 'neutral', content: 'Loves to stay neutral'}),
  new User({_id: '124', username: 'Goku', password: 'paragon', content: 'Loves to be a good example'}),
  new User({_id: '125', username: 'Vegeta', password: 'renegade', content: 'Loves to rebel'})
);

function getUsers(){
  return users;
}

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

//For data stored in mongodb
app.use('/users', (req, res, next)=>{
  console.log(req.originalUrl)
  const username = req.query.username;
  const password = req.query.password;

  User.findOne({username: username, password: password}, function(err, user){
    if(err){
      return res.status(404).json({
        status: 2,
        user: null
      });
    }

    return res.status(200).json({
      status: 0,
      user: user
    });
  })

});

//For data stored in node server
//Status: 2=>Wrong user, 1=>Wrong password, 0=>Correct
/*app.use('/users', (req, res, next)=>{
  console.log(req.originalUrl)
  const username = req.query.username;
  const password = req.query.password;

  const authuser =
    users.forEach((user)=>{
      if (user.username === username) {
        if (user.password === password) {
          return res.status(200).json({
            status: 0,
            user: user
          });
        } else {
          return res.status(200).json({
            status: 1,
            user: null
          });
        }
      }
    })
  return res.status(200).json({
    status: 2,
    user: null
  });
  //res.send('Hello from the other side');
});*/

module.exports = app;
