const express = require('express');
const db = require('../models');
const router = express.Router();
const passport = require('../config/ppConfig');
const axios = require('axios');
require('dotenv').config();
// place - create a new post
// router.post('/', (req, res) => {
//     db.place.create({
//         location: req.body.location,
//         title: req.body.title,
//         image: req.body.image,
//         description: req.body.description,
//         userId: req.body.userId
//     })
//     .then((post) => {
//         res.redirect('/')
//     })
//     .catch((error) => {
//         res.status(400).render('main/404')
//     })
// });

// create a new review
// router.post('/:id/reviews', (req, res) => {
//     const createdDate = new Date().toISOString();
//     db.place.findOne({
//       where: { id: req.params.id },
//       include: [db.review]
//     })
//     .then((place) => {
//       if (!place) throw Error()
//       db.comment.create({
//         placeId: parseInt(req.params.id),
//         content: req.body.content,
//         createdAt: createdDate,
//         updatedAt: createdDate
//       }).then(review => {
//         res.redirect(`/places/${req.params.id}`);
//       })
//     })
//     .catch((error) => {
//       console.log(error)
//       res.status(400).render('main/404')
//     })
//   })


  //routes
router.get('/', async (req, res) => {
  //get all of the places from database
  let places = await db.place.findAll();
  places = places.map( p => p.toJSON());
  console.log(places);
  //render the (songs/index) page
  res.render('places/index', { places : places })
});

router.get('/search', (req, res) => {
  res.render('places/search');
});

router.get('/results', async (req, res) => {
  //get back the search item
  console.log('>>>> SEARCH DATA', req.query);
  //use axios to find the results
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete',
    params: { text: req.query.search },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
  };

  const response = await axios.request(options);
  console.log('response >>>', response.data);
  //render the songs/results page
  res.render('places/results', { data: response.data });
});

router.get('/:id', async (req, res) => {
  //print place to verify
  let place = await db.place.findOne({
    where: { id: req.params.id }
  });
  place = place.toJSON();
  console.log('==this is show route==')
  console.log(place);
  //go to the db and grab one place
  
  //render the places/show page with the place
  res.render('places/show', { place: place })
});

router.post('/new', async (req, res) => {
  // print req.body to view form inputs
  console.log('/new', req.body);
  const newPlace = await db.place.create({
    location: req.body.location,
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    userId: parseInt(req.body.userId)
  });
  console.log(newPlace.toJSON());
  // res.redirect to all favorite songs
  res.redirect('/places')
});

//first you will need to find the place
// db.place.findOne({
//   where: { id: 'anything'}
// })
// .then(song => {
//   let count = place.count;
//   db.place.update({
//     count: count + 1
//   }, {
//     where: {
//       title: "Pier 39"
//     }
//   })
// })

module.exports = router;