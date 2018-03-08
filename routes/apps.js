const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/home', (req, res, next) => {
  res.render('apps/home', {menu: 'Tapas'});
});

router.get('/discover', (req, res, next) => {
  res.render('apps/discover', {menu: 'Discover'});
});

router.get('/library', (req, res, next) => {
  res.render('apps/library', {menu: 'Library'});
});

router.get('/inbox', (req, res, next) => {
  res.render('apps/inbox', {menu: 'Inbox'});
});

module.exports = router;
