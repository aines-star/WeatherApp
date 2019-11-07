/*
  * ----------------------THIS IS THE PART 3 WEATHER APP BACKEND  ---------------------------------------------
*/


/*
  * This first section will be regarding our GLOBAL SCOPE ELEMENTS ---------------------------------------------
*/

var express = require('express');
var router = express.Router();
let request = require("async-request");
var mongoose = require('mongoose');
var cityModel = require('../models/city')

var cityList = [
  {name:"Paris",desc: "Couvert", img:"/images/picto-1.png",tempMin:2, tempMax:19},
  {name:"Marseille",desc: "Couvert", img:"/images/picto-1.png",tempMin:4, tempMax:12},
  {name:"Lyon",desc: "Couvert", img:"/images/picto-1.png",tempMin:0, tempMax:10},
]

// You need to put here your own api Key in order to be able to access the api data
var myWeatherAppKey ="d917138e1f6fb29de755e5b4371600a5"

/*
  * ROUTES SECTION ---------------------------------------------------------------------------------------------
*/

/* GET home page. */
/* on modifie le chemin en rajoutant cities pour le login */
router.get('/cities', async function(req, res, next) {
  var user = req.session.user;

    // We aske our database to give us back ALL of our cities
    var citiesFind = await cityModel.find();
    if(!req.session.user){
      res.redirect('/')
    }else{
  res.render('index',{cityList:citiesFind, user});
    }
});
/* chemin pour le login */

router.get('/', async function(req, res, next) {

  var citiesFind = await cityModel.find()
var user = req.session.user;
res.render('login', {user});
});
/* Add-city. */
router.post('/add-city', async function(req, res, next) {

    // we save the form input value in the cityName element
    var cityNameFromFront = req.body.newcity;

    // We initialize the language for french (cf the documentation)
    var lang = "fr";

    // We initialize the temperature to Celcius (cf the documentation)
    var celcius = "metric";
  
    // Here is our async request to access the weather data
    var data = await request(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameFromFront}&lang=${lang}&units=${celcius}&appid=${myWeatherAppKey}`);

    // We need to parse the body to be able to access the data with the format json
    body = JSON.parse(data.body);
  
    // We save the information from the api
    var descApi = body.weather[0].description;
    var tempMinApi = body.main.temp_min;
    var tempMaxApi = body.main.temp_max;
    var cityNameApi = body.name;
    var icon = 'http://openweathermap.org/img/w/'+body.weather[0].icon+'.png';

    //We need to optimize our temperature result for the display

    
    tempMinApi = (tempMinApi).toFixed(0)
    tempMaxApi = (tempMaxApi).toFixed(0)
    

    // We create our new city
    var newCity = new cityModel({
      name: cityNameApi,
      desc: descApi,
      img: icon,
      temp_min: tempMinApi,
      temp_max: tempMaxApi,
    });
    
    // We save our new city in our MongoDB
    var citySaveToDb = await newCity.save()

    // We ask our database to give us back ALL of our cities
    var citiesFindAll = await cityModel.find()

    // this will log to your console your cities collection
    console.log(`Here is our complete city database -- > ${citiesFindAll}`)
  var user = req.session.user;
  res.render('index',{cityList:citiesFindAll, user});
});

/* Delete-city. */
router.get('/delete-city', async function(req, res, next) {

  // 1) We Save the ID from the front
        /* As you can see, we need to use this time --> req.QUERY and not req.BODY. With GET we use query, and POST we use body.*/
  var cityId = req.query._id;

  // We need to delete this city in our database 
  var cityDelete = await cityModel.deleteOne({ _id: cityId});

  // We aske our database to give us back ALL of our cities
  var citiesFindAll = await cityModel.find();
var user = req.session.user;
res.render('index',{cityList:citiesFindAll, user});
});


// export section 
module.exports = router;








/* ---- CONSOLE LOG TECHNICS ------------------------------ */

/* 1) Basics log to debug your code along the way */

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
