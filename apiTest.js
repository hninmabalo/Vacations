require('dotenv').config();
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete',
  params: {text: 'newyork', languagecode: 'en-us'},
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});