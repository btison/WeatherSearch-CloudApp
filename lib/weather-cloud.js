var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var $fh = require('fh-mbaas-api');

function weatherRoute() {
  var weather = new express.Router();
  weather.use(cors());
  weather.use(bodyParser());

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  weather.post('/city', function(req, res) {
    console.log(new Date(), 'In weather/city route POST / req.body=', req.body);

    var city = req.body.city;
    var country = req.body.country;

    console.log(new Date(), 'city=' + city + ',country=' + country);

    var options = {
      "guid" : "f56rp7rhwe4gfkgtyiakeuqh", // The 24 character unique id of the service
      "path": "/weather-service/city", //the path part of the url excluding the hostname - this will be added automatically
      "method": "POST",   //all other HTTP methods are supported as well. e.g. HEAD, DELETE, OPTIONS
      "params": {
        "city": city,
        "country": country
      }, //data to send to the server - same format for GET or POST
      "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
      "headers" : {
        // Custom headers to add to the request. These will be appended to the default headers.
      }
    };

    var callback = function(err, body, theServiceRes) {
      console.log('statuscode: ', theServiceRes && theServiceRes.statusCode);
      if ( err ) {
        // An error occurred during the call to the service. log some debugging information
        console.log('service call failed - err : ', err);

        // see http://expressjs.com/4x/api.html#res.json
        res.json({msg: JSON.stringify(body)});
      } else {
        console.log('Got response from service - status body : ', theServiceRes.statusCode, body);

        var temp = body.main.temp;

        // see http://expressjs.com/4x/api.html#res.json
        res.json({msg: temp});
      }
    };

    $fh.service(options, callback);

  });

  weather.post('/location', function(req,res) {
    console.log(new Date(), 'In weather/location route POST / req.body=', req.body);
    
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;

    console.log(new Date(), 'latitude=' + latitude + ',longitude=' + longitude);

    var options = {
      "guid" : "f56rp7rhwe4gfkgtyiakeuqh", // The 24 character unique id of the service
      "path": "/weather-service/location", //the path part of the url excluding the hostname - this will be added automatically
      "method": "POST",   //all other HTTP methods are supported as well. e.g. HEAD, DELETE, OPTIONS
      "params": {
        "latitude": latitude,
        "longitude": longitude
      }, //data to send to the server - same format for GET or POST
      "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
      "headers" : {
        // Custom headers to add to the request. These will be appended to the default headers.
      }
    };

    var callback = function(err, body, theServiceRes) {
      console.log('statuscode: ', theServiceRes && theServiceRes.statusCode);
      if ( err ) {
        // An error occurred during the call to the service. log some debugging information
        console.log('service call failed - err : ', err);

        // see http://expressjs.com/4x/api.html#res.json
        res.json({msg: JSON.stringify(body)});
      } else {
        console.log('Got response from service - status body : ', theServiceRes.statusCode, body);

        var temp = body.main.temp;

        // see http://expressjs.com/4x/api.html#res.json
        res.json({msg: temp});
      }
    };

    $fh.service(options, callback);

  });

  return weather;
}

module.exports = weatherRoute;