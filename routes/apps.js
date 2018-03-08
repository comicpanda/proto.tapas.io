const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/home', (req, res, next) => {
  res.render('apps/home', {menu: 'Tapas'});
});

router.get('/discovery', (req, res, next) => {
  res.render('apps/discovery', {menu: 'Discovery'});
});

router.get('/library', (req, res, next) => {
  res.render('apps/library', {menu: 'Library'});
});

router.get('/inbox', (req, res, next) => {
  res.render('apps/inbox', {menu: 'Inbox'});
});

module.exports = router;
