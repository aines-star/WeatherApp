var express = require('express');
var router = express.Router();

/*
  * This first section will be regarding our global scope element
*/

var cityList = [
  {name:"Paris",desc: "Couvert", img:"/images/picto-1.png",temp_min:2, temp_max:19},
  {name:"Marseille",desc: "Couvert", img:"/images/picto-1.png",temp_min:4, temp_max:12},
  {name:"Lyon",desc: "Couvert", img:"/images/picto-1.png",temp_min:0, temp_max:10},
]


/*
  * Routes section 
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{cityList});
});

/* Add-city. */
router.post('/add-city', function(req, res, next) {

  // we save the form input value in the cityName element
  var cityName = req.body.newcity

  // we push in our cityList array a new element 
  cityList.push({
    name:cityName,
    desc: "Couvert", 
    img:"/images/picto-1.png",
    temp_min:2, 
    temp_max:19
  })

  res.render('index',{cityList});
});

/* Delete-city. */
router.get('/delete-city', function(req, res, next) {

  // 1) We Save the position from the front
        /* As you can see, we need to use this time --> req.QUERY and not req.BODY. With GET we use query, and POST we use body.*/
  var cityPosition = req.query.position

  // 2) We will delete the city in our cityList array 
  cityList.splice(cityPosition,1)

  res.render('index',{cityList});
});

// export section 
module.exports = router;

/* ---- CONSOLE LOG TECHNICS ------------------------------ */

// /* 1) Basics log to debug your code along the way */

//   console.log('Je suis dans ma route')
//       // Terminal result
//       je suis dans ma route

//   console.log('Resultat de ma requête -->', req.body)
//       // Terminal result
//       Resultat de ma requête --> [{name:....}]

// /* 2) Advanced console inside a loop with high quality result */
    
// console.log(`From front --> City name loop test : city number ${i+1} is ${cityList[i].name}`)
//       // Terminal result
//       From front --> City name loop test : city number 1 is Paris
//       From front --> City name loop test : city number 2 is Marseille
//       From front --> City name loop test : city number 3 is Lyon




});