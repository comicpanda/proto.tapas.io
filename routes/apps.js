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

router.get('/comic-home', (req, res, next) => {
  res.render('apps/ugc-home', {
    menu: 'Discover',
    sub: 'Community',
    headerCss: 'comic',
    type: 'comic',
    hasSegment: true,
  });
});

router.get('/novel-home', (req, res, next) => {
  res.render('apps/ugc-home', {
    menu: 'Discover',
    sub: 'Community',
    headerCss: 'novel',
    type: 'novel',
    hasSegment: true,
  });
});

router.get('/collections', (req, res, next) => {
  res.render('apps/collections', {menu: 'Discover', sub: 'Collections'});
});

router.get('/creators', (req, res, next) => {
  res.render('apps/creators', {menu: 'Discover', sub: 'Creators'});
});

module.exports = router;
