const express = require('express');
const db = require('../models');
const router = express.Router();
const passport = require('../config/ppConfig');
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
require('dotenv').config();

router.get('/', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get(); 
    res.render('profile', { id, name, email });
});
  
router.get('/edit', isLoggedIn, (req, res) => {
    res.render('edit');
});
  
router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const foundUser = await db.user.findOne({ where: { email: req.body.email }});
    if (!foundUser) {
      const usersUpdated = await db.user.update({
        email: req.body.email,
        name: req.body.name
      }, {
        where: {
          id: req.params.id
        }
      });

      res.redirect('/profile'); // route
    } else if (foundUser.email && foundUser.id !== req.user.id) {
      req.flash('error', 'Email already exists. Please try again.');
      res.redirect('/profile');
    } else {
      const usersUpdated = await db.user.update({
        email: req.body.email,
        name: req.body.name
      }, {
        where: {
          id: req.params.id
        }
      });

      console.log('********** PUT ROUTE *************');
      console.log('Users updated', usersUpdated);
      console.log('**************************************************');

      // redirect back to the profile page
      res.redirect('/profile'); // route
    }
} catch (error) {
  console.log('*********************ERROR***********************');
  console.log(error);
  console.log('**************************************************');
  res.render('profile/edit');
}
});

  module.exports = router;