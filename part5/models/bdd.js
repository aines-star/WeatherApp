// Do not forget to store your new request module in a variable in order to use it
const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
   connectTimeoutMS: 5000,
   useNewUrlParser: true,
  };

mongoose.connect('mongodb+srv://aines:doudou@cluster0-jhdco.mongodb.net/mymovizapp?retryWrites=true&w=majority',
    options,
    function(err) {
     if (err) {
       console.log(err);
     } else {
       console.info('Database meteoapp connection OK');
     }
    }
);

module.exports = mongoose;