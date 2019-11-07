var express = require('express');
var router = express.Router();
var cityList = [ 
    {nom: "Paris",image: "/images/picto-1.png",descriptif: "ensoleille",temp_min: "12",temp_max:"18"},

    {nom: "Marseille",image: "/images/picto-1.png",descriptif: "nuageux",temp_min: "12",temp_max:"18"},

    {nom: "Lyon",image: "/images/picto-1.png",descriptif: "nuageux",temp_min: "12",temp_max:"18"}
]
var request = require('request');
request("https://jsonplaceholder.typicode.com/users", function(error, response, body) {

 console.log(body);

});
/* GET home page. */
router.get('/', function(req,res,next){
  res.render('index', { cityList });
});

router.post('/add-city', function(req,res,next){
    console.log('New city -- >',req.body.newCity)

    var cityName = req.body.newCity

    cityList.push({
        nom: cityName,
        descriptif: "Couvert",
        img:"/images/picto-1.png",
        temp_max:19,
        temp_min:3,
    })

  res.render('index', { cityList })
})

router.get('/delete-city', function(req,res,next){
    console.log('position --->', req.query.position)

    var cityPosition = req.query.position
    
    cityList.splice(cityPosition,1)

    res.render('index', {cityList})
    })
  module.exports = router;