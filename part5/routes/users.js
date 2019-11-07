var express = require('express');
var router = express.Router();
var userModel = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User sign-up
router.post('/sign-up',async function(req, res, next) {
  var usernameFromFront = req.body.username;
  var emailFromFront = req.body.email;
  var passwordFromFront = req.body.password;

  var newUser = new userModel({
    username: usernameFromFront,
    email:emailFromFront,
    password:passwordFromFront,
  });

  var existingUser = await userModel.findOne( { email: emailFromFront})

  if(existingUser) {
    req.session.user = userSaveToDb;
    res.redirect('/');
  } else {
    // We save our new user in our MongoDB
    var userSaveToDb = await newUser.save();

    res.redirect('/cities');
  }
});
 
 
// User sign-in
router.post('/sign-in', async function(req, res, next) {
    
    var emailFromFront = req.body.email;
    var passwordFromFront = req.body.password;
  
    var userBdd = await userModel.findOne({ email: emailFromFront,password:passwordFromFront})
    req.session.user = userBdd;
    var user = req.session.user;

    if(!userBdd){
      
      console.log(`There is no one in the database with the email : ${emailFromFront}, so we will dispay the login page again, the user will have to sign-up first`)
 
      res.redirect('/')

    } else {
      console.log(`We ound the user in the database with the email : ${emailFromFront}, so we can display the cities page`)
  
      res.redirect('/cities');
    };
  });
 
 
 
// User Logout
router.get('/logout',function(req, res, next) {
     req.session.user = null;

  res.redirect('/')
});



module.exports = router;
