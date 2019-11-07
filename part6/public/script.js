var mymap = L.map('worldmap',
{ 
center :[48.866667, 2.333333], 
zoom:  4
 }
);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


var marqueur = document.getElementsByClassName('DataMarqueur');

var customIcon = L.icon({
    iconUrl: '/images/leaf-green.png',
    shadowUrl: '/images/leaf-shadow.png',
  
    iconSize:   [20, 45], 
    shadowSize:  [30, 44], 
  
    iconAnchor:  [10, 70], 
    shadowAnchor: [4, 62],  
  
    popupAnchor: [-3, -76]
});

for (var i=0; i< marqueur.length;i++) {

var longitude = marqueur[i].dataset.lon;
var latitude = marqueur[i].dataset.lat;
console.log("longitude",longitude);
console.log("latitude",latitude);

var cityname= marqueur[i].dataset.cityname;


  

L.marker([latitude, longitude],{icon: customIcon}).addTo(mymap).bindPopup(cityname);
}
