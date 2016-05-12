var express = require('express');
var router = express.Router();
var template = require('art-template');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  var cookies = req.cookies
  console.log("Cookies: ", cookies);
  if (cookies && cookies.greedhubtoken) {
    var data = {
      title: 'title',
      menu: ['notification','repo','star','setting']
    };
    var html = template('index', data);
    res.send(html);
    // res.render('index', data);
  } else {
    res.redirect('http://localhost:2028/login');
  }
});

/* login */
router.get('/login', function(req, res, next) {
  var data = {
    title: 'login'
  };
  var html = template('login', data);
  res.send(html);
  // template.render('login', data);
  // res.render('login', data);
});


/* callback */
router.get('/callback', function(req, res, next) {
  // console.log(req.query);
  if (req.query.state == "login_greedhub") {
    res.setHeader('Set-Cookie', ['greedhubtoken=' + req.query.code]);
  }
  res.redirect('http://localhost:2028/');
});

module.exports = router;
